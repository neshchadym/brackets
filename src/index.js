module.exports = function check(str, bracketsConfig) {
    let openCloseMap = {};
    let closeOpenMap = {};
    bracketsConfig.forEach (config => {
            openCloseMap[config[0]] = config[1];
            closeOpenMap[config[1]] = config[0];
        }
    );

    let stack = [];
    try {
        str.split('').forEach(currChar => {
            if (openCloseMap.hasOwnProperty(currChar)) { // if this is an open symbol
                if (closeOpenMap.hasOwnProperty(currChar) && stack[stack.length - 1] === currChar) {
                    stack.pop();
                } else {
                    stack.push(currChar);
                }
            } else if (closeOpenMap.hasOwnProperty(currChar)) { // if this is a close symbol
                if (stack[stack.length - 1] === closeOpenMap[currChar]) {
                    stack.pop();
                } else {
                    throw Error('---');
                }
            }
        });
    } catch (e) {
        return false;
    }

    return stack.length === 0;
};
