import React from 'react';
import ReactDOM from 'react-dom';
import './search.css';
import './search.less';
import logo from './static/empty.png';
import test from './static/test.png';
import '../../common';

class Search extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      Text: null,
    };
  }

  loadComponent() {
    import('./test.js').then((Text) => {
      console.log(Text);
      this.setState({
        Text: Text.default,
      });
    });
  }

  render() {
    const { Text } = this.state;
    return (
      <div className="search-test">
        {
          Text ? <Text /> : null
        }
        Search Test
        <img src={logo} alt="加载失败" onClick={this.loadComponent.bind(this)} />
        <img className="search-test-img" src={test} alt="加载失败" />
        <ul className="search-test-ul">
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
        </ul>
      </div>
    );
  }
}
ReactDOM.render(
  <Search />,
  document.getElementById('root'),
);
