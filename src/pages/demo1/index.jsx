import React,{Component} from 'react'
import { render } from 'react-dom'

class Demo3 extends Component {

  render() {
    return (
      <div>demo run 11</div>
    )
  }
}
console.log(document.getElementById('app'))
render(<Demo3 />,document.getElementById('app'))