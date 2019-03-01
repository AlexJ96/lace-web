import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class BlockerService {

  constructor() { }

  blocks: Array<string> = [];
  blocksUpdated: EventEmitter<Array<string>> = new EventEmitter();

  submitBlocks = function () {
    this.blocksUpdated.emit(this.blocks);
  };

  getBlocks(): Array<string> {
    return this.blocks;
  }

  block(blocksToAdd) {
    blocksToAdd.forEach(block => {
      this.blocks.push(block);
    });
    this.submitBlocks();
  }

  unblock(blocksToRemove) {
    blocksToRemove.forEach(block => {
      var index = this.blocks.indexOf(block);
      this.blocks.splice(index, 1);
    });
    this.submitBlocks();
  }

  unblockAll() {
    this.blocks = [];
    this.submitBlocks();
  }
  
}