const { execSync } = require("child_process");

const accepts = {'application/json': ` --format '{{json .}}'`};

const execString = cmd => execSync(cmd).toString();
const execJsonObject = cmd => JSON.parse(execSync(cmd).toString());
const execJsonPerRow = (cmd) => {
    const rows = execSync(cmd).toString().match(/^(.+)$/gm);
    if (rows === null) return [];
    return rows.map(JSON.parse);
}

exports.get = (method, path, query, headers) => {
    const segments = path.split('/').filter(p => p.length > 0);
    const parseSegment = (segment) => {
        return Object.prototype.hasOwnProperty.call(query, segment)
            ? Array.isArray(query[segment]) ? query[segment].join(' ') : query[segment]
            : segment;
    };
    const cmd = `docker ${segments.map(parseSegment).join(' ')} ${accepts[query.accept || headers.accept] || ''}`;
    if (Object.prototype.hasOwnProperty.call(query, 'test')) {
        return cmd;
    }
    let isJson = cmd.indexOf('json') > 0;
    try {
        return isJson
            ? execJsonPerRow(cmd)
            : execString(cmd);
    } catch (err){ 
        return err.stderr
            ? err.stderr.toString()
            : err.message;
    }
};
