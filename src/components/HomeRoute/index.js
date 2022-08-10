import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import HomePoster from '../HomePoster'
import TrendingRoute from '../TrendingRoute'
import OriginalRoute from '../OriginalRoute'
import FooterRoute from '../FooterRoute'

import './index.css'
import FailureView from '../FailureView'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class HomeRoute extends Component {
  state = {
    originalsList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getOriginals()
  }

  getOriginals = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const originalsUrl = 'https://apis.ccbp.in/movies-app/originals'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(originalsUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const fetchedData = data.results.map(eachItem => ({
        backdropPath: eachItem.backdrop_path,
        posterPath: eachItem.poster_path,
        id: eachItem.id,
        overview: eachItem.overview,
        title: eachItem.title,
      }))
      this.setState({
        originalsList: fetchedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onRetry = () => {
    this.getOriginals()
  }

  renderFailureView = () => (
    <div className="home-fail-div">
      <FailureView onRetry={this.onRetry} />
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader
        testid="loader"
        type="TailSpin"
        height={35}
        width={380}
        color=" #D81F26"
      />
    </div>
  )

  renderSuccessView = () => {
    const {originalsList} = this.state
    const singleObject =
      originalsList[Math.floor(Math.random() * originalsList.length)]

    return (
      <div className="home-poster-div">
        <HomePoster posterDetails={singleObject} />
      </div>
    )
  }

  renderHomePoster = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div className="home-app-container">
          {this.renderHomePoster()}
          <div className="home-responsive-container">
            <h1 className="slide-title">Trending now</h1>

            <TrendingRoute />

            <h1 className="slide-title">Originals</h1>
            <OriginalRoute />
            <FooterRoute />
          </div>
        </div>
      </>
    )
  }
}
export default HomeRoute
