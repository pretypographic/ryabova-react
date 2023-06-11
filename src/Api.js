class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _getJSON(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Error: ${res.status} - ${res.statusText}`);
  }

  getProjectsArchive() {
    return fetch(`${this.baseUrl}/projects`, { headers: this.headers })
      .then(this._getJSON);
  }

  getProject(index) {
    return fetch(`${this.baseUrl}/project/${index}`, { headers: this.headers })
      .then(this._getJSON);
  }

  postProject(project) {
    return fetch(`${this.baseUrl}/projects`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        title: `${project.title}`,
        cover: `${project.cover}`
      })
    })
      .then(this._getJSON);
  }

  patchProject(project, index) {
    return fetch(`${this.baseUrl}/project/${index}`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        title: `${project.title}`,
        cover: `${project.cover}`
      })
    })
      .then(this._getJSON);
  }

  patchExplication(data, index) {
    return fetch(`${this.baseUrl}/project/${index}`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        description: data
      })
    })
      .then(this._getJSON);
  }

  patchSections(data, index) {
    return fetch(`${this.baseUrl}/project/${index}`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        sections: data
      })
    })
      .then(this._getJSON);
  }

  deleteProject(index) {
    return fetch(`${this.baseUrl}/project/${index}`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then(this._getJSON);
  }

  errorMessege(err) {
    console.log(err);
  }
}

const api = new Api({
  baseUrl: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json'
  }
});

export { api }