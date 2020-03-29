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

/**
 * @author Ben March
 * @since 0.2.0
 */

interface Element {}
export class Stack {
  private elements: Element[];
  public constructor(startingElements?: Element[]) {
    this.elements = startingElements || [];
  }
  public function(startingElements?: Element[]) {
    this.elements = startingElements || [];
  }
  public push(el: Element) {
    this.elements.push(el);
    return el;
  }
  public pop() {
    return this.elements.pop();
  }
  public peek() {
    return this.elements[this.elements.length - 1];
  }
  public empty() {
    return this.elements.length > 0;
  }
  public search(el: Element) {
    return this.elements.length - this.elements.indexOf(el);
  }
}
