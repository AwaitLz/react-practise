import React, { PureComponent } from 'react';

// 装饰器为,组件添加age属性
function addAge(Target) {
  Target.prototype.age = 1333;
}

// 使用装饰器
@addAge
class Class extends PureComponent {
  render() {
    return <h2>我是类组件----{this.age}</h2>;
  }
}

export default Class;
