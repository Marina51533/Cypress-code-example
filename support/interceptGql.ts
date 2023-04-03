import { OrtusType } from '../../src/API'
import {
  applyAndUndo,
  noReplenishmentFound,
  onlyApply,
  onlyUndo,
  planningBoardRules,
} from '../fixtures/planningBoardRules'
import { multiSourcedItem } from '../fixtures/singleItem/multiSourced'
import { multiSourcedReplenishment } from '../fixtures/singleReplenishment'
import { releasedReplenishment } from '../fixtures/singleItem/releasedReplenishment'
import { releasedItem } from '../fixtures/singleItem/releasedItem'
import { rejectedReplenishment } from '../fixtures/singleItem/rejectedReplenishment'
import { rejectedItem } from '../fixtures/singleItem/rejectedItem'

Cypress.Commands.add('interceptGql', () => {
  cy.intercept(Cypress.env('backendUrl'), (req) => {
    const {
      body: { variables, query },
    } = req
    let response = {}
    if (query.includes('listOrtuses')) {
      response = planningBoardRules
    }
    if (query.includes('GetSelectionKeysFromPbRule')) {
      if (variables.ruleSelectionKey === 'onlyApply') {
        response = onlyApply
      } else if (variables.ruleSelectionKey === 'onlyUndo') {
        response = onlyUndo
      } else if (variables.ruleSelectionKey === 'applyAndUndo') {
        response = applyAndUndo
      } else if (variables.ruleSelectionKey === 'noReplenishmentFound') {
        response = noReplenishmentFound
      }
    }
    if (query.includes('GetOrtus')) {
      if (
        variables.type === OrtusType.REPLENISHMENT &&
        variables.selectionKey === 'multiSourced'
      ) {
        response = multiSourcedReplenishment
      }
      if (
        variables.type === OrtusType.ITEM &&
        variables.selectionKey === 'multiSourced'
      ) {
        response = multiSourcedItem
      }
      if (
        variables.type === OrtusType.REPLENISHMENT &&
        variables.selectionKey === 'released'
      ) {
        response = releasedReplenishment
      }
        if (
          variables.type === OrtusType.ITEM &&
          variables.selectionKey === 'released'
        ) {
          response = releasedItem
        }
        if (
          variables.type === OrtusType.REPLENISHMENT &&
          variables.selectionKey === 'rejected'
        ) {
          response = rejectedReplenishment
        }
        if (
          variables.type === OrtusType.ITEM &&
          variables.selectionKey === 'rejected'
        ) {
          response = rejectedItem
        }
    }
    req.reply({
      body: { data: response },
    })
  })
})
