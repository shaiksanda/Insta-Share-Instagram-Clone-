// import {Component} from 'react'
// import Cookies from 'js-cookie'
// import Loader from 'react-loader-spinner'
// import Slider from 'react-slick'
// import {FaAngleDoubleLeft, FaAngleDoubleRight} from 'react-icons/fa'

// import Header from '../Header'

// import './index.css'

// const PrevArrow = props => {
//   const {className, onClick} = props
//   return <FaAngleDoubleLeft className={className} onClick={onClick} />
// }

// // Custom next arrow
// const NextArrow = props => {
//   const {className, onClick} = props
//   return <FaAngleDoubleRight className={className} onClick={onClick} />
// }

// class Home extends Component {
//   state = {
//     userStories: [],
//     isLoading: true,
//     postsData: [],
//     isLoadingPosts: true,
//   }

//   componentDidMount() {
//     this.getUserStories()
//     this.getPosts()
//   }

//   getUserStories = async () => {
//     this.setState({isLoading: true})
//     const jwtToken = Cookies.get('jwt_token')
//     const url = 'https://apis.ccbp.in/insta-share/stories'
//     const options = {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${jwtToken}`,
//       },
//     }
//     const response = await fetch(url, options)
//     const data = await response.json()
//     const updatedData = data.users_stories.map(each => ({
//       userId: each.user_id,
//       storyUrl: each.story_url,
//       userName: each.user_name,
//     }))
//     if (response.ok) {
//       this.setState({userStories: updatedData, isLoading: false})
//     } else {
//       this.setState({isLoading: false})
//     }
//   }

//   getPosts = async () => {
//     this.setState({isLoadingPosts: true})
//     const jwtToken = Cookies.get('jwt_token')
//     const url = 'https://apis.ccbp.in/insta-share/posts'
//     const options = {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${jwtToken}`,
//       },
//     }
//     const response = await fetch(url, options)
//     const data = await response.json()
//     const updatedData = data.posts.map(each => ({
//       comments: each.comments,
//       createdAt: each.created_at,
//       likesCount: each.likes_count,
//       postDetails: each.post_details,
//       postId: each.post_id,
//       profilePic: each.profile_pic,
//       userId: each.user_id,
//       userName: each.user_name,
//     }))

//     console.log(updatedData)
//     if (response.ok) {
//       console.log(data)
//       this.setState({isLoadingPosts: false, postsData: updatedData})
//     } else {
//       this.setState({isLoadingPosts: false})
//     }
//   }

//   renderLoaderView = () => (
//     <div
//       style={{textAlign: 'center'}}
//       className="loader-container"
//       testid="loader"
//     >
//       <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
//     </div>
//   )

//   render() {
//     const {userStories, isLoading, postsData, isLoadingPosts} = this.state
//     const settings = {
//       dots: true,
//       arrows: true,
//       infinite: true,
//       speed: 500,
//       prevArrow: <PrevArrow color="#4094EF" className="slick-prev" />, // Custom previous arrow
//       nextArrow: <NextArrow color="#4094EF" className="slick-next" />, // Custom next arrow
//       slidesToShow: 6, // Default for larger screens
//       slidesToScroll: 3,
//       responsive: [
//         {
//           breakpoint: 1024, // For laptops and larger devices
//           settings: {
//             slidesToShow: 9,
//             slidesToScroll: 9,
//           },
//         },
//         {
//           breakpoint: 768, // For tablets and mobile devices
//           settings: {
//             slidesToShow: 3,
//             slidesToScroll: 3,
//           },
//         },
//       ],
//     }

//     return (
//       <div>
//         <Header />
//         <div className="home-container">
//           {isLoading ? (
//             this.renderLoaderView()
//           ) : (
//             <>
//               <Slider {...settings}>
//                 {userStories.map(each => (
//                   <div
//                     className="container"
//                     key={each.userId}
//                     style={{paddingLeft: '20px'}}
//                   >
//                     <img
//                       src={each.storyUrl}
//                       alt="user story"
//                       className="user-story-image"
//                     />
//                     <p className="user-name">{each.userName}</p>
//                   </div>
//                 ))}
//               </Slider>
//             </>
//           )}
//           {isLoadingPosts ? (
//             this.renderLoaderView()
//           ) : (
//             <div className="each-post-container">
//               {postsData.map(each => (
//                 <div key={each.postId}>
//                   <div
//                     style={{
//                       display: 'flex',
//                       gap: '10px',
//                       alignItems: 'center',
//                       marginBottom: '10px',
//                     }}
//                   >
//                     <img
//                       className="user-story-image"
//                       src={each.profilePic}
//                       alt="post author profile"
//                     />
//                     <h1 className="user-name">{each.userName}</h1>
//                   </div>
//                   <img
//                     src={each.postDetails.image_url}
//                     alt="post"
//                     className="post-image"
//                   />
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     )
//   }
// }

// export default Home

import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import Loading from '../Loader'
import Stories from '../Stories'
import Posts from '../Posts'
import PostItem from '../PostItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    searchInput: '',
    searchResults: [],
    apiStatus: apiStatusConstants.initial,
  }

  getSearchData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchInput} = this.state

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/insta-share/posts?search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.posts.map(each => ({
        comments: each.comments.map(eachComment => ({
          userName: eachComment.user_name,
          userId: eachComment.user_id,
          comment: eachComment.comment,
        })),
        createdAt: each.created_at,
        likesCount: each.likes_count,
        postDetails: {
          imageUrl: each.post_details.image_url,
          caption: each.post_details.caption,
        },
        postId: each.post_id,
        profilePic: each.profile_pic,
        userId: each.user_id,
        userName: each.user_name,
      }))
      console.log(updatedData)
      this.setState({
        apiStatus: apiStatusConstants.success,
        searchResults: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  clickSearchButton = input => {
    this.setState({searchInput: input}, this.getSearchData)
  }

  renderSuccessView = () => {
    const {searchResults} = this.state
    return (
      <div className="posts-main-container">
        {searchResults.length === 0 ? (
          <div className="no-posts-container">
            <img
              src="https://res.cloudinary.com/dzvmpn4nr/image/upload/v1679656768/Group_uiehcz.svg"
              alt="search not found"
              className="not-found-image"
            />
            <h1 className="search-not-found-text">Search Not Found</h1>
            <p className="search-not-found-para">
              Try different keyword or search again
            </p>
          </div>
        ) : (
          <div className="search-container">
            <h1 className="search-heading">Search Results</h1>
            <ul className="search-posts-list">
              {searchResults.map(each => (
                <PostItem details={each} key={each.postId} />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }

  renderViews = () => {
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

  renderFailureView = () => (
    <div className="profile-error-view-container">
      <img
        src="https://res.cloudinary.com/dzvmpn4nr/image/upload/v1679656650/Group_7522_mbm51a.svg"
        alt="failure view"
        className="profile-failure-img"
      />
      <p className="profile-failure-text">
        Something went wrong. Please try again.
      </p>
      <button
        type="button"
        data-testid="button"
        className="profile-failure-button"
        onClick={this.getSearchData}
      >
        Try again
      </button>
    </div>
  )

  renderLoadingView = () => (
    // eslint-disable-next-line react/no-unknown-property
    <Loading />
  )

  render() {
    const {searchInput} = this.state
    return (
      <>
        <Header searchFunction={this.clickSearchButton} />
        {searchInput === '' ? (
          <>
            <Stories />
            <Posts />
          </>
        ) : (
          this.renderViews()
        )}
      </>
    )
  }
}
export default Home
