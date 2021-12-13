const { execSync } = require("child_process");

const execString = cmd => execSync(cmd).toString();
const execJsonObject = cmd => JSON.parse(execSync(cmd).toString());
const execJsonPerRow = (cmd) => {
    const rows = execSync(cmd).toString().match(/^(.+)$/gm);
    if (rows === null) return [];
    return rows.map(JSON.parse);
}

const formatAccept = (accept) => {
    let format = '';
    switch (accept) {
        case 'application/json':
            format = ` --format '{{json .}}'`
            break;
        default:
            break;
    }
    return format;
};

exports.get = (method, path, query, headers) => {
    const parts = path.split('/').filter(p => p.length > 0);
    let cmd = `docker ${parts.join(' ')} ${formatAccept(headers.accept)}`;
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
