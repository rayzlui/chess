import { connect } from "react-redux";
import { RootView } from "../views/RootView";

function mapStateToProps(state) {
  return {
    turn: state.turn,
    checkMate: state.board.checkMate,
    check: state.board.check
  };
}

export const RootViewContainer = connect(
  mapStateToProps,
  null
)(RootView);
