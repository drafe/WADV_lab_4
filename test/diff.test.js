import {Expression} from "../src/expression";

test('Single constant can be processed',()=>{
    const expr = new Expression('2');
    expect(expr.diff('x').toString()).toBe('0');
});

test('X with coefficient can be processed',()=>{
    const expr = new Expression('2*x');
    expect(expr.diff('x').toString()).toBe('2');
});

test('X with neg coefficient can be processed',()=>{
    const expr = new Expression('-2*x');
    expect(expr.diff('x').toString()).toBe('-2');
});

test('Single operand can be processed', ()=>{
    const expr = new Expression('x^2');
    expect(expr.diff('x').toString()).toBe('2*x');
});

test('Single operand with coef can be processed and simplified', ()=>{
    const expr = new Expression('3*x^2');
    expect(expr.diff('x').toString()).toBe('6*x');
});

test('Multiple operands can be processed', ()=>{
    const expr = new Expression('x^4-x^2');
    expect(expr.diff('x').toString()).toBe('4*x^3 - 2*x');
});

test('Multiple operands can be processed and simplified', ()=>{
    const expr = new Expression('3*x-x^1');
    expect(expr.diff('x').toString()).toBe('2');
});

test('Unary minus can be processed and simplified', ()=>{
    const expr = new Expression('-3*x-x');
    expect(expr.diff('x').toString()).toBe('-4');
});

test('Another variable can be processed', ()=>{
    const expr = new Expression('x^4-x^2');
    expect(expr.diff('y').toString()).toBe('0');
});

// test('Unexpected symbols error', ()=>{
//     expect(new Expression('y/(-x)')).toThrowError(TypeError('Oops, some unexpected symbols in string.'));
// });
//
// test('Long variable name error', ()=>{
//     expect(new Expression('yx')).toThrowError(TypeError('Oops, some long variable in string. Please, use * between different variables.'));
// });