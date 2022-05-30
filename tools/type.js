module.exports = type = {
    is: {
        str: val => typeof val === 'string',
        bool: val => (typeof val === 'boolean') || val === "true" || val === "false",
        num: val => typeof val === 'number',
        ary: val => Array.isArray(val),
        obj: val => (type.is.null(val) || type.is.undef(val)) ? false : (!Array.isArray(val) && (typeof val === 'object')),
        date: val => val instanceof Date,
        null: val => val === null,
        undef: val => val === undefined,
        nan: val => isNaN(val),
        empty: val => (type.is.ary(val)) ? val.length === 0 : Object.keys(val).length === 0
    },
    not: {
        str: val => !type.is.str(val),
        bool: val => !type.is.bool(val),
        num: val => !type.is.num(val),
        ary: val => !type.is.ary(val),
        obj: val => !type.is.obj(val),
        date: val => !type.is.str(val),
        null: val => !type.is.null(val),
        undef: val => !type.is.undef(val),
        nan: val => !type.is.nan(val),
        empty: val => !type.is.empty(val)
    }
}