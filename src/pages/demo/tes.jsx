import React,{Component} from 'react'
import { render } from 'react-dom'

class Demo1 extends Component {

  render() {
    return (
      <div>demo run 11</div>
    )
  }
}
console.log(document.getElementById('app'))
render(<Demo1 />,document.getElementById('app'))