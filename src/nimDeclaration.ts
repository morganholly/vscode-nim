/*---------------------------------------------------------
 * Copyright (C) Xored Software Inc. All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------*/

'use strict';

import vscode = require('vscode');
import { getDirtyFile } from './nimUtils';
import { execNimSuggest, NimSuggestResult, NimSuggestType} from './nimSuggestExec';


export class NimDefinitionProvider implements vscode.DefinitionProvider {

  public provideDefinition(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): Thenable<vscode.Location> {
    return new Promise<vscode.Location>((resolve, reject) => {
      execNimSuggest(NimSuggestType.def, document.fileName, position.line + 1, position.character,
        getDirtyFile(document)).then(result => {

          if (result && result.length > 0) {
            let def = result.pop();
            resolve(def.location);
          } else {
            resolve(null);
          }
        }).catch(reason => reject(reason));
    });
  }

}