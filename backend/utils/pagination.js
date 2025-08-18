"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginateQuery = paginateQuery;
async function paginateQuery(qb, options) {
    const { page = 1, limit = 10, search, searchField, sortField = "createdAt", sortOrder = "DESC", dateFrom, dateTo, dateField, } = options;
    // 🔎 Filtro por búsqueda
    if (search && searchField) {
        qb.andWhere(`LOWER(${searchField}) LIKE :search`, {
            search: `%${search.toLowerCase()}%`,
        });
    }
    // 📅 Filtros por fecha
    if (dateFrom && dateField) {
        qb.andWhere(`${dateField} >= :dateFrom`, { dateFrom });
    }
    if (dateTo && dateField) {
        qb.andWhere(`${dateField} <= :dateTo`, { dateTo });
    }
    // 📌 Orden
    qb.orderBy(sortField, sortOrder);
    // 📄 Paginación
    qb.skip((page - 1) * limit).take(limit);
    const [results, totalItems] = await qb.getManyAndCount();
    return {
        success: true,
        pagination: {
            page,
            totalPages: Math.ceil(totalItems / limit),
            hasMore: page * limit < totalItems,
            limit,
        },
        totalItems,
        results,
    };
}
//# sourceMappingURL=pagination.js.map