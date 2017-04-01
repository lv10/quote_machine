import React from 'react';

import axios from 'axios';

import TheButton from './button.js';


let quotesPerPage = 25;
let URL = 'https://quotesondesign.com/wp-json/posts';
let twitterLogo = 'https://goo.gl/eb4yeX';


class Quote extends React.Component {
    constructor () {
        super();
        this.state = {
            randNbr: 0,
            author: "",
            theQuote: "",
            htmlQuote: "",
            twitterPostURL: "https://twitter.com/intent/tweet?text="
        };
        this.query = '?filter[orderby]=rand&filter[posts_per_page]=' + quotesPerPage;

    }

    componentDidMount = () => {
        let request_url = URL + this.query;

        this.setState({
            randNbr: Math.floor(Math.random()*(quotesPerPage-1)+1)
        });

        axios.get(request_url)
            .then(r => {
                let htmlQuote = r.data[this.state.randNbr].content.replace(/<(?:.|\n)*?>/gm, '');
                this.setState({
                    author: this.formatQuote(r.data[this.state.randNbr].title),
                    theQuote: this.formatQuote(r.data[this.state.randNbr].content),
                    htmlQuote: r.data[this.state.randNbr].content.replace(/<(?:.|\n)*?>/gm, ''),
                });

                this.setState({
                    twitterPostURL:  `${this.state.twitterPostURL}` + encodeURIComponent(`${htmlQuote}-${this.state.htmlQuote}`)
                });

            })
            .catch(error => {
                console.log('QuoteError: ', error);
            });
    }

    handleClick = () => {
        this.componentDidMount();
    }

    formatQuote = (aQuote) => {
        return React.createElement('span', {
            dangerouslySetInnerHTML: {
                __html: aQuote.replace(/<(?:.|\n)*?>/gm, '')
            }
        });
    }

    render = () => {
        return (
            <div style={{padding: 30}} >
                {this.state.theQuote} – <em>{this.state.author}</em>
                <br />
                <a href={this.state.twitterPostURL} style={{textDecoration: "None"}} >
                    <img src={twitterLogo} alt="Post on Twitter" style={{width: 25}}/>
                </a>
                &nbsp;
                <TheButton onClick={this.handleClick} />
            </div>
        );
    }

}

export default Quote;
