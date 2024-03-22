import './App.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

class App extends Component {
  state = {isLoader: false, fetchData: []}

  componentDidMount() {
    this.fetchFuncData()
  }

  fetchFuncData = async () => {
    this.setState({isLoader: true})
    const url = 'https://apis.ccbp.in/tg/packages'
    const response = await fetch(url)
    const data = await response.json()
    const formatData = data.packages.map(items => ({
      id: items.id,
      name: items.name,
      imageUrl: items.image_url,
      description: items.description,
    }))
    console.log('value:', formatData)
    this.setState({isLoader: false, fetchData: formatData})
  }

  render() {
    const {isLoader, fetchData} = this.state
    return (
      <>
        {isLoader ? (
          <div data-testid="loader" className="loader-container">
            <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
          </div>
        ) : (
          <div className="bg-container">
            <div className="title-container">
              <h1>Travel Guide</h1>
            </div>
            <ul>
              {fetchData.map(items => (
                <li key={items.name}>
                  <img src={items.imageUrl} alt={items.name} />
                  <h1>{items.name}</h1>
                  <p>{items.description}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </>
    )
  }
}

export default App
