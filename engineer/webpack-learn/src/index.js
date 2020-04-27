import React from 'react';
import ReactDom from 'react-dom';

import './search.less';
import logo from './assets/imgs/avatar.png';

class Search extends React.Component {
    render() {
        return <div className="search-text">
            Search Text
            <img src={ logo } />
        </div>
    }
}

ReactDom.render(
    <Search />,
    document.getElementById('app')
);
