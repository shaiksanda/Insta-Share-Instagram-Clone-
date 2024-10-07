import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'
import {FaAngleDoubleLeft, FaAngleDoubleRight} from 'react-icons/fa'

import Header from '../Header'

import './index.css'

const PrevArrow = props => {
  const {className, onClick} = props
  return <FaAngleDoubleLeft className={className} onClick={onClick} />
}

// Custom next arrow
const NextArrow = props => {
  const {className, onClick} = props
  return <FaAngleDoubleRight className={className} onClick={onClick} />
}

class Home extends Component {
  state = {
    userStories: [],
    isLoading: true,
    postsData: [],
    isLoadingPosts: true,
  }

  componentDidMount() {
    this.getUserStories()
    this.getPosts()
  }

  getUserStories = async () => {
    this.setState({isLoading: true})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/insta-share/stories'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const updatedData = data.users_stories.map(each => ({
      userId: each.user_id,
      storyUrl: each.story_url,
      userName: each.user_name,
    }))
    if (response.ok) {
      this.setState({userStories: updatedData, isLoading: false})
    } else {
      this.setState({isLoading: false})
    }
  }

  getPosts = async () => {
    this.setState({isLoadingPosts: true})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/insta-share/posts'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const updatedData = data.posts.map(each => ({
      comments: each.comments,
      createdAt: each.created_at,
      likesCount: each.likes_count,
      postDetails: each.post_details,
      postId: each.post_id,
      profilePic: each.profile_pic,
      userId: each.user_id,
      userName: each.user_name,
    }))

    console.log(updatedData)
    if (response.ok) {
      console.log(data)
      this.setState({isLoadingPosts: false, postsData: updatedData})
    } else {
      this.setState({isLoadingPosts: false})
    }
  }

  renderLoaderView = () => (
    <div
      style={{textAlign: 'center'}}
      className="loader-container"
      testid="loader"
    >
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  render() {
    const {userStories, isLoading, postsData, isLoadingPosts} = this.state
    const settings = {
      dots: true,
      arrows: true,
      infinite: true,
      speed: 500,
      prevArrow: <PrevArrow color="#4094EF" className="slick-prev" />, // Custom previous arrow
      nextArrow: <NextArrow color="#4094EF" className="slick-next" />, // Custom next arrow
      slidesToShow: 6, // Default for larger screens
      slidesToScroll: 3,
      responsive: [
        {
          breakpoint: 1024, // For laptops and larger devices
          settings: {
            slidesToShow: 9,
            slidesToScroll: 9,
          },
        },
        {
          breakpoint: 768, // For tablets and mobile devices
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
      ],
    }

    return (
      <div>
        <Header />
        <div className="home-container">
          {isLoading ? (
            this.renderLoaderView()
          ) : (
            <>
              <Slider {...settings}>
                {userStories.map(each => (
                  <div
                    className="container"
                    key={each.userId}
                    style={{paddingLeft: '20px'}}
                  >
                    <img
                      src={each.storyUrl}
                      alt="user story"
                      className="user-story-image"
                    />
                    <p className="user-name">{each.userName}</p>
                  </div>
                ))}
              </Slider>
            </>
          )}
          {isLoadingPosts ? (
            this.renderLoaderView()
          ) : (
            <div>
              {postsData.map(each => (
                <div key={each.postId}>
                  <img
                    className="user-story-image"
                    src={each.profilePic}
                    alt="post author profile"
                  />
                  <h1>{each.userName}</h1>
                  <img src={each.postDetails.image_url} alt="post" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default Home
