"use strict";
/*
 * Copyright 2002-2015 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author Andy Clement
 * @author Ben March
 * @since 0.2.0
 */
var types = {
  LITERAL_INT: 1,
  LITERAL_LONG: 2,
  LITERAL_HEXINT: 3,
  LITERAL_HEXLONG: 4,
  LITERAL_STRING: 5,
  LITERAL_REAL: 6,
  LITERAL_REAL_FLOAT: 7,
  LPAREN: "(",
  RPAREN: ")",
  COMMA: ",",
  IDENTIFIER: 0,
  COLON: ":",
  HASH: "#",
  RSQUARE: "]",
  LSQUARE: "[",
  LCURLY: "{",
  RCURLY: "}",
  DOT: ".",
  PLUS: "+",
  STAR: "*",
  MINUS: "-",
  SELECT_FIRST: "^[",
  SELECT_LAST: "$[",
  QMARK: "?",
  PROJECT: "![",
  DIV: "/",
  GE: ">=",
  GT: ">",
  LE: "<=",
  LT: "<",
  EQ: "==",
  NE: "!=",
  MOD: "%",
  NOT: "!",
  ASSIGN: "=",
  INSTANCEOF: "instanceof",
  MATCHES: "matches",
  BETWEEN: "between",
  SELECT: "?[",
  POWER: "^",
  ELVIS: "?:",
  SAFE_NAVI: "?.",
  BEAN_REF: "@",
  SYMBOLIC_OR: "||",
  SYMBOLIC_AND: "&&",
  INC: "++",
  DEC: "--" //tested
};
function TokenKind(type) {
  this.type = type;
  this.tokenChars = types[type];
  this._hasPayload = typeof types[type] !== "string";
  if (typeof types[type] === "number") {
    this._ordinal = types[type];
  }
}
exports.TokenKind = TokenKind;
//create enum
for (var t in types) {
  if (types.hasOwnProperty(t)) {
    TokenKind[t] = new TokenKind(t);
  }
}
TokenKind.prototype.toString = function() {
  return (
    this.type +
    (this.tokenChars.length !== 0 ? "(" + this.tokenChars + ")" : "")
  );
};
TokenKind.prototype.getLength = function() {
  return this.tokenChars.length;
};
TokenKind.prototype.hasPayload = function() {
  return this._hasPayload;
};
TokenKind.prototype.valueOf = function(id) {
  for (var t in types) {
    if (types.hasOwnProperty(t) && types[t] === id) {
      return TokenKind[t];
    }
  }
};
TokenKind.prototype.ordinal = function() {
  return this._ordinal;
};
//# sourceMappingURL=TokenKind.js.map
