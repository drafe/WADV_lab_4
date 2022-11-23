class Expression {
    constructor(inputString) {
        if (typeof(inputString) === "string") {
            this._expr = inputString.toLowerCase().replace(/\s+/g, "");
            this._op = this._split(this._expr)
        } else {
            this._op = inputString
        }
    }

    _getStr(_op) {
        const lp = _op.lp
        const rp = _op.rp
        let op = _op.op
        if (['N', 'V'].includes(op)) { return `${lp}`}
        else{
            if (['+', '-'].includes(op)) {op = ` ${op} `}
            return `${this._getStr(lp)}${op}${this._getStr(rp)}`
        }
    }

    toString(){
        return this._getStr(this._op)
    }

    _diff(_op, _v) {
        switch (_op.op) {
            case "+":
            case "-":
                _op = {"op": _op.op, "lp": this._diff(_op.lp, _v), "rp": this._diff(_op.rp, _v)}
                // если + между числами, они складываются
                if (_op.lp.op === "N" && _op.rp.op === "N")
                    return {"op": "N", "lp": _op.lp.lp+parseInt(`${_op.op}${_op.rp.lp}`)}
                return _op
            case "N":
            case "V":
                if (_op.lp === _v)
                    return {"op": "N", "lp": 1}
                else
                    return {"op": "N", "lp": 0}
            case "^":
                if (_op.lp.lp !== _v)
                    return {"op": "N", "lp": 0}
                else {
                    let lp = {"op": "N", "lp":_op.rp.lp}
                    let rp = {}
                    if (_op.rp.lp === 1) {
                        return  lp
                    }
                    else if (_op.rp.lp === 2) {
                        rp = {"op": "V", "lp":_v}
                    }
                    else
                        rp = {"op": "^",
                        "lp": {"op": "V", "lp":_v},
                        "rp": {"op": "N", "lp":_op.rp.lp-1} }
                    return {"op": "*", "lp": lp, "rp": rp}
                }
            case "*":
                _op = {"op": _op.op, "lp": _op.lp, "rp": this._diff(_op.rp, _v)}
                if (_op.lp.op === "N" && _op.rp.op === "N")
                    return {"op": "N", "lp": _op.lp.lp*_op.rp.lp}

                if (_op.rp.op === "*" && _op.lp.op === "N" && _op.rp.lp.op === "N") {
                    _op.lp = {"op": "N", "lp": _op.lp.lp * _op.rp.lp.lp}
                    _op.rp = _op.rp.rp
                }
                return _op

        }
    }

    diff(variable){
        let op = this._diff(this._op, variable)

        return new Expression(op);
    }

    _split(str) {
        let op = ''
        let i = -1
        const operatos = ["+", "-", "*", "^"]
        for (op of operatos.values()) {
            i = str.indexOf(op, 1)
            if (i > -1) { break }
        }
        if (i === -1) {
            if (parseInt(str)) { return {op: "N", lp: parseInt(str)}
            } else { return {op: "V", lp: str} }
        }

        return {op: op, lp: this._split(str.slice(0, i)), rp: this._split(str.slice(i+1))}
    }

}

export {Expression}