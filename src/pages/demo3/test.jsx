import React,{Component} from 'react'
import { render } from 'react-dom'

class Demo extends Component {

  render() {
    return (
      <div>demo run</div>
    )
  }
}
console.log(document.getElementById('app'))
render(<Demo />,document.getElementById('app'))