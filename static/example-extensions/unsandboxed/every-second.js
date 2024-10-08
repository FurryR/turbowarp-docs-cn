(function(Scratch) {
  'use strict';
  class EverySecond {
    getInfo() {
      return {
        id: 'everysecondexample',
        name: '每秒',
        blocks: [
          {
            opcode: 'everySecond',
            blockType: Scratch.BlockType.HAT,
            text: '每秒',
            isEdgeActivated: false
          }
        ]
      };
    }
  }
  // highlight-start
  setInterval(() => {
    const startedThreads = Scratch.vm.runtime.startHats('everysecondexample_everySecond');
  }, 1000);
  // highlight-end
  Scratch.extensions.register(new EverySecond());
}(Scratch));
