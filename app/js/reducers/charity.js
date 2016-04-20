import { GET_CHARITY } from 'js/constants/ActionTypes'

const initialState = [
  {
    text: 'Use Redux',
    completed: false,
    id: 0
  }
]


function loadCharityFromServer() {
  let { charityId } = this.props.params;

  var url = "api/charities";
  $.ajax({
    url: url + "/" + charityId,
    dataType: 'json',
    cache: false,
    success: function (data) {
      //this.setState({loading: false, charity: data.charity});
      // notify
    }.bind(this),
    error: function (xhr, status, err) {
      console.error(this.props.url, status, err.toString());
    }.bind(this)
  });
}

export default function charities(state = initialState, action = {}) {
  switch (action.type) {
    case GET_CHARITY:
      return [
        {
          id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
          completed: false,
          text: action.text
        }, 
        ...state
      ]

    default:
      return state
  }
}
