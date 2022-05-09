import React from 'react';

class APIcall extends React.Component {
  state = {text:'["not empty"]', trails: [], isLoading: true, error: null };

  async componentDidMount() {
    try {
      const response = await fetch('https://atlas.microsoft.com/search/poi/json?api-version=1.0&query=hiking%20trail&subscription-key=SJ740NtjRi6RDR2eojq6VHfCv-0U8WhBYKZkG-rNnhA&lat=42.444&lon=-76.5019&radius=100000');
      const data = await response.json();
      this.setState({ trails: data, isLoading: false });

    } catch (error) {
      this.setState({ error: error.message, isLoading: false });
    }
  }

  renderTrails = () => {
    const { text, trails, isLoading, error } = this.state;

    if (error) {
      return <div>{error}</div>;
    }

    if (isLoading) {
      return <div>Loading...</div>;
    }

    return  (
      <div >
          <p>text:{text}</p>
        <p>First: {trails.results[0].poi.name}</p>
        <p> Second: {trails.results[1].poi.name}</p>
      </div>
    );
  };

  render() {
    return <div>{this.renderTrails()}</div>;
  }
}

export default APIcall;