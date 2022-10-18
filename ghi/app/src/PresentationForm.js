import React from 'react';

class PresentationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      presenter_name: '',
      presenter_email: '',
      company_name: '',
      title: '',
      synopsis: '',
      conference: '',
      conferences: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const url = 'http://localhost:8000/api/conferences/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      this.setState({ conferences: data.conferences });
    }
  }

  handleChange(event) {
    const newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {...this.state};
    delete data.conferences;
    const conferenceId = data.conference;

    const locationUrl = `http://localhost:8000/api/conferences/${conferenceId}/presentations/`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(locationUrl, fetchConfig);
    if (response.ok) {
      const newConference = await response.json();
      console.log(newConference);
      this.setState({
        presenter_name: '',
        presenter_email: '',
        company_name: '',
        title: '',
        synopsis: '',
        conference: '',
      });
    }
  }

  render() {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new presentation</h1>
            <form onSubmit={this.handleSubmit} id="create-presentation-form">
              <div className="form-floating mb-3">
                <input onChange={this.handleChange} value={this.state.presenter_name} placeholder="Presenter name" required type="text" id="presenter_name" className="form-control" />
                <label htmlFor="presenter_name">Presenter name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleChange} value={this.state.presenter_email} placeholder="Presenter email" required type="email" id="presenter_email" className="form-control" />
                <label htmlFor="presenter_email">Presenter email</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleChange} value={this.state.company_name} placeholder="Company name" type="text" id="company_name" className="form-control" />
                <label htmlFor="company_name">Company name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleChange} value={this.state.title} placeholder="Title" required type="text" id="title" className="form-control" />
                <label htmlFor="title">Title</label>
              </div>
              <div className="mb-3">
                <label htmlFor="synopsis">Synopsis</label>
                <textarea onChange={this.handleChange} value={this.state.synopsis} id="synopsis" className="form-control" rows="3" ></textarea>
              </div>
              <div className="mb-3">
                <select onChange={this.handleChange} value={this.state.conference} required className="form-select" id="conference">
                  <option value="">Choose a conference</option>
                  {this.state.conferences.map(conference => {
                    return (
                      <option key={conference.id} value={conference.id}>{conference.name}</option>
                    )
                  })}
                </select>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default PresentationForm;
