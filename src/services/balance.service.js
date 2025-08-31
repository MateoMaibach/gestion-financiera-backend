import db from '../models/db.js';

export const calcularBalance = async (fecha_inicio, fecha_fin, categoria_id) => {
  // Filtros opcionales
  let filtroFechaIngresos = '';
  let filtroFechaEgresos = '';
  let filtroCategoria = '';

  if (fecha_inicio && fecha_fin) {
    filtroFechaIngresos = ` WHERE fecha BETWEEN '${fecha_inicio}' AND '${fecha_fin}' `;
    filtroFechaEgresos = ` WHERE fecha BETWEEN '${fecha_inicio}' AND '${fecha_fin}' `;
  }

  if (categoria_id) {
    filtroCategoria = ` AND c.id = ${categoria_id} `;
  }

  // Saldo por categoría
  const [porCategoriaRows] = await db.query(`
    SELECT 
      c.nombre AS categoria,
      IFNULL(i.ingresos_totales,0) - IFNULL(e.egresos_totales,0) AS saldo
    FROM categorias c
    LEFT JOIN (
      SELECT categoria_id, SUM(monto) AS ingresos_totales
      FROM ingresos
      ${filtroFechaIngresos}
      GROUP BY categoria_id
    ) i ON c.id = i.categoria_id
    LEFT JOIN (
      SELECT categoria_id, SUM(monto) AS egresos_totales
      FROM egresos
      ${filtroFechaEgresos}
      GROUP BY categoria_id
    ) e ON c.id = e.categoria_id
    WHERE 1=1 ${filtroCategoria}
  `);

  // Saldo total
  const [saldoTotalRows] = await db.query(`
    SELECT 
      (SELECT IFNULL(SUM(monto),0) FROM ingresos ${filtroFechaIngresos}) -
      (SELECT IFNULL(SUM(monto),0) FROM egresos ${filtroFechaEgresos}) AS saldo_total
  `);

  return {
    saldo_total: saldoTotalRows[0].saldo_total,
    por_categoria: porCategoriaRows
  };
};
