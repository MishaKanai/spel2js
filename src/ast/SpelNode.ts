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

import { Stack } from "lib/Stack";

/**
 * The common supertype of all AST nodes in a parsed Spring Expression Language
 * format expression.
 *
 * @author Andy Clement
 * @author Ben March
 * @since 0.2.0
 */

type SpelNodeType = string; // for now
type ActiveContext = any; // for now
interface State {
  locals: {};
  rootContext: {};
  activeContext: Stack;
}

export interface BaseSpelNode {
  _type: SpelNodeType;
  getType: () => SpelNodeType;
  setType: (nodeType: SpelNodeType) => void;
  getChildren: () => BaseSpelNode[];
  addChild: (childNode: BaseSpelNode) => void;
  getParent: () => BaseSpelNode | null;
  setParent: (parentNode: BaseSpelNode) => void;
  getContext: (state: State) => ActiveContext;
  setContext: (nodeContext: ActiveContext) => void;
  getStartPosition: () => number;
  getEndPosition: () => number;
  getValue: (state?: State) => any; // TODO
  toString: () => string;
  // not implemented on base
  setValue?: (newValue: any, state?: State) => any;
  getName?: () => string;
}
function createSpelNode(
  nodeType: SpelNodeType,
  position: number,
  ...operands: BaseSpelNode[]
): BaseSpelNode {
  let type: SpelNodeType = nodeType || "Abstract";
  let children: BaseSpelNode[] = [];
  let parent: BaseSpelNode | null = null;
  let activeContext: ActiveContext;

  const node: BaseSpelNode = {
    _type: type,
    getType: () => type,
    setType: (nodeType: string) => {
      type = nodeType;
    },
    getChildren: () => children,
    addChild: childNode => {
      childNode.setParent(node);
      children.push(childNode);
    },
    getParent: () => parent,
    setParent: parentNode => {
      parent = parentNode;
    },
    getContext: state => activeContext || state.activeContext.peek(),
    setContext: nodeContext => {
      activeContext = nodeContext;
    },
    getStartPosition: () => position >> 16,
    getEndPosition: () => position & 0xffff,
    //must override
    getValue: () => {
      throw {
        name: "MethodNotImplementedException",
        message: "SpelNode#getValue() must be overridden."
      };
    },
    toString: () => {
      var s = "Kind: " + node.getType();
      //s += ', Value: ' + node.getValue();
      s += ", Children: [";
      for (var i = 0, l = node.getChildren().length; i < l; i += 1) {
        s += "{" + node.getChildren()[i] + "}, ";
      }
      s += "]";
      return s;
    }
  };

  //constructor
  if (position === 0) {
    throw {
      name: "Error",
      message: "Position cannot be 0"
    };
  }

  if (operands) {
    operands.forEach(function(operand) {
      node.addChild(operand);
    });
  }

  return node;
}

export const SpelNode = {
  create: createSpelNode
};
