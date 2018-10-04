import React,{Component} from 'react';
import { render } from 'react-dom';
import '../../common/rem750';
import '../../common/base.css';

class Test extends Component {

  render() {
    const x:number = 1;
    console.log(x);
    return null;
  }
}

render(<Test />,document.getElementById('app'));