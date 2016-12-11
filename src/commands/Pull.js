// Pull
import { sendEvent, sendError } from '../analytics'
import { checkForFile, createFailAlert, exec } from '../common'
import { importFromJSON } from 'sketch-module-json-sync'

export default function (context) {
  if (!checkForFile(context)) { return }
  try {
    sendEvent(context, 'Pull', 'Pull remote')
    exec(context, 'git pull -q')
    importFromJSON(context)
    context.document.showMessage('Changes pulled')
  } catch (e) {
    sendError(context, e)
    createFailAlert(context, 'Failed...', e, true)
  }
}
