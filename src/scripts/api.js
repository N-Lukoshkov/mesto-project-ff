const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-17',
  headers: {
    authorization: '6290236a-a5fb-4d32-bb95-224e6f51da9a',
    'Content-Type': 'application/json'
  }
}

const apiRequest = (request) => {
  return fetch(`${config.baseUrl}/${request.url}`, {
    method: `${request.method}`,
    headers: config.headers,
    body: JSON.stringify(request.body)
  })
  .then(res => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
}

export const getInitialCards = () => {
  return apiRequest({
    url: 'cards',
    method: 'GET'
  })
};

export const getUserProfile = () => {
  return apiRequest({
    url: 'users/me',
    method: 'GET'
  })
};

export const updateProfile = (name, description) => {
  return apiRequest({
    url: 'users/me',
    method: 'PATCH',
    body: {name: name, about: description}
  })
};

export const updateAvatar = (avatar) => {
  return apiRequest({
    url: 'users/me/avatar',
    method: 'PATCH',
    body: {avatar: avatar}
  })
}

export const uploadCard = (card) => {
  return apiRequest({
    url: 'cards',
    method: 'POST',
    body: card
  })
}

export const deleteLike = (id) => {
  return apiRequest({
    url: `cards/likes/${id}`,
    method: 'DELETE'
  })
}

export const addLike = (id) => {
  return apiRequest({
    url: `cards/likes/${id}`,
    method: 'PUT'
  })
}

export const apiDeleteCard = (id) => {
  return apiRequest({
    url: `cards/${id}`,
    method: 'DELETE'
  })
}