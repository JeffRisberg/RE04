import { GET_GIVING_HISTORY } from 'js/constants/ActionTypes'

const initialState = [
  {
    text: 'Use Redux',
    completed: false,
    id: 0
  }
]


function loadGivingHistoryFromServer() {
  let { ch } = this.props.params;

  var url = "api/donors/givingHistory";
  $.ajax({
    url: url,
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

export default function giving_history(state = initialState, action = {}) {
  switch (action.type) {
    case GET_GIVING_HISTORY:
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
