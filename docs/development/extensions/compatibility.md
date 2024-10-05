---
hide_table_of_contents: true
---

# 保持向前兼容

Once projects exist using your extension, it is critical that you do not change the extension in ways that will break compatibility as doing so will effectively **corrupt projects.**

## 你最好别动什么

### 永远别动扩展 ID

```js
  getInfo() {
    return {
      // highlight-start
      // 别动，不然用你扩展的作品就全坏了！！！
      id: 'fetch'
      // highlight-end
      // ...
    };
  }
```

### 永远别动积木的 opcode 和积木类型

Instead, create a new block and mark the old one as `hideFromPalette: true`.

It is generally safe to change blockType from REPORTER to BOOLEAN or from HAT to EVENT, but a conversion of HAT to BOOLEAN would be problematic.

```js
  getInfo() {
    return {
      // ...
      blocks: [
        {
          // highlight-start
          // 别删，不然用这个积木的作品就别想编辑作品了！！！
          blockType: Scratch.BlockType.REPORTER,
          opcode: "fetch",
          // highlight-end
          // ...
        }
      ]
    };
  }
```

### 永远别删积木

Instead, create a new block and mark the old one as `hideFromPalette: true`.

```js
  getInfo() {
    return {
      // ...
      blocks: [
        // highlight-start
        // 别删，不然用这个积木的作品就全坏了！！！
        {
          opcode: "old",
          hideFromPalette: true
          // highlight-end
          // ...
        }
      ]
    };
  }
```

### 永远别动参数 ID 和类型

```js
  getInfo() {
    return {
      // ...
      blocks: [
        {
          // highlight-start
          // THE ARGUMENT ID "INPUT" MUST NEVER BE CHANGED OR REMOVED
          text: "block [INPUT]",
          arguments: {
            INPUT: {
              type: Scratch.ArgumentType.REPORTER,
              // highlight-end
              // ...
            }
          },
          // ...
        }
      ]
    };
  }
```

### 永远别往已经存在的积木加参数

Instead, create a new block and mark the old one as `hideFromPalette: true`. The new block can be reimplemented in terms of the old one:

```js
  getInfo() {
    return {
      // ...
      blocks: [
        {
          blockType: Scratch.BlockType.REPORTER,
          id: "oldBlock",
          text: "old [INPUT1]",
          arguments: {
            INPUT1: { /* ... */ }
          },
          hideFromPalette: true
        },
        {
          blockType: Scratch.BlockType.REPORTER,
          opcode: "newBlock",
          text: "new [INPUT1] [INPUT2]",
          arguments: {
            INPUT1: { /* ... */ },
            INPUT2: { /* ... */ }
          }
        }
      ]
    };
  }
  oldBlock(args) {
    return this.newBlock({
      ...args,
      INPUT2: "Default value"
    });
  }
  newBlock(args) {
    // ...
  }
```

### 别动 isTerminal

If a COMMAND block does not already have `isTerminal: true`, then don't add it as doing so will cause existing projects that connect blocks underneath to break. Instead, create a new block and optionally hide the old one.

### 别动 acceptReporters

Converting an input menu to a field menu and vice-versa does not work and will corrupt projects. Create a new menu and block instead.

### 别显著修改积木的行为

Trivial bug fixes are typically fine, but significant changes may break projects. This is a bit harder to quantify; the best way to make sure your changes don't break projects is extensive testing.

## 你可以动什么

You can always change these parts of extension metadata:

 - name
 - docsURI
 - color1, color2, color3
 - menuIconURI and blockIconURI

You can always change these parts of blocks and arguments:

 - text, as long as it contains the same arguments (changing argument order is safe)
 - disableMonitor (enabling true just hides checkmark, does not remove existing monitors)
 - hideFromPalette
 - filter (adding filter just hides from palette, does not remove existing blocks)
 - defaultValue
 - dataURI and flipRTL in image inputs

For menus, you can always change `text`, but you should not change `value` without careful consideration. Adding menu items is always okay, but removing menu items is dangerous.

## 万一我就是非得动不可呢？

There are times when there is no option but to break backward compatibility. In these instances, you should **create a brand new extension with an entirely new ID** and leave the old version untouched.

For example, if your extension `fetch` needs a complete redesign, you could create a new extension with the ID `fetch2`.

## 下一步

Next, let's learn [how to share your extension with the world](./share).
