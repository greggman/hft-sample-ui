/*
 * Copyright 2014, Gregg Tavares.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Gregg Tavares. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
"use strict";

define([
  './eventemitter',
], function(
  EventEmitter
) {

  class PlayerNameManager extends EventEmitter {
    constructor(netPlayer) {
      super();
      this._netPlayer = netPlayer;
      this._name = "";
      this._busy = false;

      this._handleSetName = this._handleSetName.bind(this);
      this._handleBusy = this._handleBusy.bind(this);

      netPlayer.on('_hft_setname_', this._handleSetName);
      netPlayer.on('_hft_busy_', this._handleBusy);
    }

    _handleSetName(data) {
      if (data.name && data.name !== this._name) {
        this._name = data.name;
        this.emit('setName', this._name);
      }
    }

    _handleBusy(data) {
      if (data.busy !== this._busy) {
        this._busy = data.busy;
        this.emit('busy', this._busy);
      }
    }

    get name() {
      return this._name;
    }

    get busy() {
      return this._busy;
    }
  }

  return PlayerNameManager;

});
