package state

import (
	"artyomliou/xenoblast-backend/internal/pkg_proto"
	"fmt"
	"sync"

	"go.uber.org/zap"
)

type StateManager struct {
	logger       *zap.Logger
	currentState pkg_proto.GameState
	playerReady  map[int32]bool
	mutex        sync.RWMutex
}

func NewStateManager(logger *zap.Logger) *StateManager {
	return &StateManager{
		logger:       logger,
		currentState: pkg_proto.GameState_Init,
		playerReady:  map[int32]bool{},
		mutex:        sync.RWMutex{},
	}
}

func (sm *StateManager) Transition(newState pkg_proto.GameState) error {
	sm.mutex.Lock()
	defer sm.mutex.Unlock()

	if newState == pkg_proto.GameState_Crash {
		sm.saveAndPrintNewState(newState)
		return nil
	}
	switch sm.currentState {
	case pkg_proto.GameState_Init:
		if newState == pkg_proto.GameState_Preparing {
			sm.saveAndPrintNewState(newState)
		} else {
			return sm.newInvalidTransitionError(newState)
		}
	case pkg_proto.GameState_Preparing:
		if newState == pkg_proto.GameState_Prepared {
			sm.saveAndPrintNewState(newState)
		} else {
			return sm.newInvalidTransitionError(newState)
		}
	case pkg_proto.GameState_Prepared:
		if newState == pkg_proto.GameState_WaitingReady {
			sm.saveAndPrintNewState(newState)
		} else {
			return sm.newInvalidTransitionError(newState)
		}
	case pkg_proto.GameState_WaitingReady:
		if newState == pkg_proto.GameState_Countdown {
			sm.saveAndPrintNewState(newState)
		} else {
			return sm.newInvalidTransitionError(newState)
		}
	case pkg_proto.GameState_Countdown:
		if newState == pkg_proto.GameState_Playing {
			sm.saveAndPrintNewState(newState)
		} else {
			return sm.newInvalidTransitionError(newState)
		}
	case pkg_proto.GameState_Playing:
		if newState == pkg_proto.GameState_Gameover {
			sm.saveAndPrintNewState(newState)
		} else {
			return sm.newInvalidTransitionError(newState)
		}
	case pkg_proto.GameState_Gameover:
		if newState == pkg_proto.GameState_Gameover {
			sm.logger.Warn("duplicated state gameover")
		} else {
			return sm.newInvalidTransitionError(newState)
		}
	default:
		return fmt.Errorf("unknown state %q", newState)
	}
	return nil
}

func (sm *StateManager) SetStateForTesting(newState pkg_proto.GameState) {
	sm.mutex.Lock()
	defer sm.mutex.Unlock()

	sm.saveAndPrintNewState(newState)
}

func (sm *StateManager) saveAndPrintNewState(newState pkg_proto.GameState) {
	sm.currentState = newState
	sm.logger.Sugar().Debugf("new state %s", newState.String())
}

func (sm *StateManager) newInvalidTransitionError(newState pkg_proto.GameState) error {
	return fmt.Errorf("invalid transition from %s to %s", sm.currentState, newState)
}

func (sm *StateManager) CurrentState() pkg_proto.GameState {
	sm.mutex.RLock()
	defer sm.mutex.RUnlock()

	return sm.currentState
}
