import React, { Component } from "react";
import Newsitems from "./Newsitems";
import Rotate from "./Rotate";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pagesize: "6",
    category: "general",
  }
  static propTypes = {
    country: PropTypes.string,
    pagesize: PropTypes.number,
    category: PropTypes.string,
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )}-NewsBoy`;
  }

  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    this.setState({ loading: true });
    let data = await fetch(url);
    let parseData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false,
    })

    this.props.setProgress(100);
  }
  async componentDidMount() {
    console.log("cdm");
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3f3cf53b8528465f84a2295cd6ef85c2&page=1&pageSize=${this.props.pagesize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false,
    });
  }

     handelPrevClick = async () => {
      console.log(" periveous");
      // let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=3f3cf53b8528465f84a2295cd6ef85c2&page=${this.state.page-1}&pageSize=${this.props.pagesize}`;
      //this.setState({loading:true});
      //let data=await fetch(url);
      //let parseData = await data.json()
      // console.log(parseData);
      // this.setState({
      //     page:this.state.page-1,
      //     articles: parseData.articles,
      //    loading:false
      //  })

      this.setState({ page: this.state.page - 1 });
      this.updateNews();
    };
     handelNextClick = async () => {
      console.log(" next");
      //  if(!(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pagesize))){
      //  let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3f3cf53b8528465f84a2295cd6ef85c2&page=${this.state.page+1}&pageSize=${this.props.pagesize}`;
      //  this.setState({loading:true});
      //  let data=await fetch(url);
      //  let parseData = await data.json()
      //  console.log(parseData);
      // this.setState({
      //     page:this.state.page+1,
      //     articles: parseData.articles,
      //    loading:false
      //  })

      // }

      this.setState({ page: this.state.page + 1 });
      this.updateNews();
    };
    fetchMoreData = async () => {
      this.setState({ page: this.state.page + 1 });
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3f3cf53b8528465f84a2295cd6ef85c2&page=1&pageSize=${this.props.pagesize}`;
      let data = await fetch(url);
      let parseData = await data.json();
      this.setState({
        articles: this.state.articles.concat(parseData.articles),
        totalResults: parseData.totalResults,
      });
    };
    render()
    {
      return (
        <div className="container my-5">
          <h1 className="text-center" style={{ margin: "40px 0px" }}>
            {" "}
            NewsBoy- Top {this.capitalizeFirstLetter(
              this.props.category
            )} Headlines{" "}
          </h1>
          {this.state.loading && <Rotate />}
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Rotate />}
          >
            <div className="row">
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <Newsitems
                      title={element.title}
                      description={element.description}
                      imageurl={element.urlToImage}
                      newsurl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </InfiniteScroll>
        </div>
      );
    }
  
}

export default News;
