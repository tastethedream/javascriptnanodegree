import { DAMAGE_SHIELD, REPAIR_SHIELD } from './actions'

const initialState = {
    shieldLevel: 100,
}

const shieldsReducer = (state = initialState, action) => {
    switch (action.type) {
        case DAMAGE_SHIELD:
            const { amount } = action
            let { shieldLevel } = state

            shieldLevel -= amount

            return {
                ...state,
                shieldLevel,
            }

        case REPAIR_SHIELD:
            const { amount } = action
            let { shieldLevel } = state

            shieldLevel += amount

            return {
                ...state,
                shieldLevel,
            }
    }
}