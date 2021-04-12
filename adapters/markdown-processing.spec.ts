import { rest } from "msw";
import { setupServer } from "msw/node";
import {
  generateMarkdown,
  generateTableOfContents,
  parseMarkdown,
} from "./markdown-processing";

const markdown = `
## Lorem ipsum dolor sit amet

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In ornare quam viverra orci. Venenatis tellus in metus vulputate. Egestas diam in arcu cursus euismod quis viverra nibh. Nulla malesuada pellentesque elit eget gravida cum. Augue lacus viverra vitae congue eu consequat ac felis. Viverra adipiscing at in tellus integer. Blandit cursus risus at ultrices mi. Cursus mattis molestie a iaculis at. Faucibus ornare suspendisse sed nisi lacus sed viverra tellus. Semper quis lectus nulla at volutpat diam. Cursus eget nunc scelerisque viverra mauris in. Nibh ipsum consequat nisl vel pretium lectus.

Eu feugiat pretium nibh ipsum consequat nisl vel. Odio facilisis mauris sit amet massa vitae tortor condimentum. Cursus risus at ultrices mi. In vitae turpis massa sed elementum tempus egestas. Amet dictum sit amet justo donec enim diam. Eu volutpat odio facilisis mauris sit amet massa. Magna etiam tempor orci eu lobortis elementum nibh. Tortor aliquam nulla facilisi cras fermentum odio eu feugiat. Elementum tempus egestas sed sed risus pretium quam vulputate dignissim. Neque volutpat ac tincidunt vitae semper quis lectus. Eu nisl nunc mi ipsum faucibus. Duis convallis convallis tellus id interdum velit laoreet id. In eu mi bibendum neque. In pellentesque massa placerat duis. Vel fringilla est ullamcorper eget nulla facilisi. Ornare massa eget egestas purus viverra accumsan in. Nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper. Pellentesque adipiscing commodo elit at.

:::callout{variant="warning"}
A condimentum vitae sapien pellentesque habitant. In ornare quam viverra orci sagittis eu volutpat odio. Nunc sed augue lacus viverra. Vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique. Bibendum est ultricies integer quis auctor elit. Porttitor rhoncus dolor purus non enim praesent elementum. Cras pulvinar mattis nunc sed blandit libero volutpat. Vitae congue eu consequat ac felis donec et. Ipsum suspendisse ultrices gravida dictum fusce ut placerat orci. Mauris in aliquam sem fringilla. Turpis massa tincidunt dui ut. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper.

Sed cras ornare arcu dui. Non diam phasellus vestibulum lorem sed risus ultricies. Est pellentesque elit ullamcorper dignissim. Massa tincidunt nunc pulvinar sapien et ligula. Tempus iaculis urna id volutpat lacus. At risus viverra adipiscing at in tellus. Mi ipsum faucibus vitae aliquet nec ullamcorper sit amet. Sapien et ligula ullamcorper malesuada proin. Lacus viverra vitae congue eu consequat ac felis donec. Tincidunt lobortis feugiat vivamus at augue. Pretium vulputate sapien nec sagittis aliquam malesuada. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Pellentesque id nibh tortor id aliquet lectus proin nibh. Sed odio morbi quis commodo. Ultrices dui sapien eget mi proin sed. Sit amet consectetur adipiscing elit pellentesque habitant morbi tristique senectus. Massa tempor nec feugiat nisl pretium fusce. Vulputate enim nulla aliquet porttitor lacus.
:::

### Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua

Nulla pellentesque dignissim enim sit amet venenatis urna cursus. Diam phasellus vestibulum lorem sed risus. Enim sed faucibus turpis in. Donec ac odio tempor orci dapibus ultrices in iaculis. Nullam vehicula ipsum a arcu cursus vitae. In pellentesque massa placerat duis ultricies lacus sed. Malesuada fames ac turpis egestas sed. Est ultricies integer quis auctor elit. Aliquet enim tortor at auctor urna. Quisque egestas diam in arcu cursus euismod quis viverra nibh. Volutpat lacus laoreet non curabitur gravida arcu. Viverra orci sagittis eu volutpat odio facilisis. Non nisi est sit amet facilisis magna etiam tempor orci. Amet nisl suscipit adipiscing bibendum est. Ornare quam viverra orci sagittis. In arcu cursus euismod quis viverra nibh cras pulvinar mattis. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed ullamcorper.

Purus sit amet luctus venenatis lectus magna fringilla urna. At quis risus sed vulputate odio. Sollicitudin aliquam ultrices sagittis orci a. A scelerisque purus semper eget duis at tellus. Tortor id aliquet lectus proin nibh nisl condimentum id. Auctor neque vitae tempus quam pellentesque nec nam. Nunc sed id semper risus. Volutpat diam ut venenatis tellus in metus. Ac tortor vitae purus faucibus ornare suspendisse. Mauris sit amet massa vitae. Tristique senectus et netus et.

Egestas purus viverra accumsan in nisl. Congue quisque egestas diam in arcu cursus. Etiam sit amet nisl purus in mollis nunc sed. Urna neque viverra justo nec ultrices dui sapien eget. Faucibus a pellentesque sit amet porttitor. Fusce id velit ut tortor. Malesuada fames ac turpis egestas sed. Diam vel quam elementum pulvinar. Sed sed risus pretium quam vulputate dignissim suspendisse in. Nunc faucibus a pellentesque sit amet porttitor eget dolor. Sed turpis tincidunt id aliquet risus feugiat. Velit ut tortor pretium viverra suspendisse potenti nullam ac tortor. Eros donec ac odio tempor orci dapibus ultrices. Velit sed ullamcorper morbi tincidunt ornare. In pellentesque massa placerat duis.

![Mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper](https://dummy.kohei.dev/some.png)

### Consectetur adipiscing

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Metus vulputate eu scelerisque felis imperdiet proin fermentum. Cras fermentum odio eu feugiat pretium. Scelerisque eleifend donec pretium vulputate. Tellus molestie nunc non blandit massa enim nec dui. Duis ultricies lacus sed turpis tincidunt id aliquet. Et tortor consequat id porta nibh venenatis cras. Adipiscing elit duis tristique sollicitudin nibh sit. Malesuada proin libero nunc consequat interdum varius sit amet mattis. Scelerisque felis imperdiet proin fermentum leo vel. Rhoncus urna neque viverra justo nec ultrices dui.

## Pellentesque habitant morbi

### Aliquam vestibulum morbi

Fermentum leo vel orci porta non pulvinar neque laoreet suspendisse. Sapien faucibus et molestie ac feugiat sed lectus vestibulum mattis. Pellentesque habitant morbi tristique senectus. Facilisi nullam vehicula ipsum a arcu. Ut sem nulla pharetra diam sit amet nisl suscipit adipiscing. Quam nulla porttitor massa id neque aliquam vestibulum morbi. Leo a diam sollicitudin tempor. Sit amet dictum sit amet justo donec. Urna id volutpat lacus laoreet non curabitur gravida arcu ac. Urna nunc id cursus metus aliquam eleifend mi. Condimentum id venenatis a condimentum vitae sapien pellentesque habitant morbi. Gravida rutrum quisque non tellus orci ac auctor augue.

[Ornare suspendisse sed nisi lacus sed viverra tellus in hac habitasse platea](https://dummy.kohei.dev/)

#### Nisi lacus sed viverra tellus in hac habitasse

##### Blandit cursus risus

Eget mauris pharetra et ultrices neque. Consequat interdum varius sit amet mattis vulputate enim nulla aliquet. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus vel. Amet est placerat in egestas erat imperdiet. Pellentesque elit ullamcorper dignissim cras tincidunt. Nunc mattis enim ut tellus elementum sagittis. Vel quam elementum pulvinar etiam non. Amet tellus cras adipiscing enim eu turpis egestas pretium. Accumsan lacus vel facilisis volutpat est velit. Vitae nunc sed velit dignissim sodales ut eu sem. Vel pretium lectus quam id leo. Platea dictumst quisque sagittis purus sit.

::image-figure{src="https://dummy.kohei.dev/another.jpg" caption="Viverra maecenas accumsan lacus vel. Duis ut diam quam nulla porttitor massa id neque aliquam. Sagittis eu volutpat odio facilisis."}

At varius vel pharetra vel turpis nunc eget lorem. Quam pellentesque nec nam aliquam sem et. Sit amet justo donec enim diam vulputate. Habitant morbi tristique senectus et netus et malesuada fames ac. Sodales ut eu sem integer. Urna id volutpat lacus laoreet non curabitur gravida arcu ac. Nibh tellus molestie nunc non. A lacus vestibulum sed arcu non odio euismod lacinia. Magna sit amet purus gravida quis. Nulla aliquet porttitor lacus luctus accumsan tortor posuere. Amet massa vitae tortor condimentum lacinia quis vel eros donec. Elementum curabitur vitae nunc sed velit dignissim. Urna porttitor rhoncus dolor purus non enim praesent. Id faucibus nisl tincidunt eget nullam non. Dui faucibus in ornare quam viverra orci sagittis eu volutpat. Faucibus vitae aliquet nec ullamcorper. Ac felis donec et odio pellentesque diam. Velit euismod in pellentesque massa.

Et ultrices neque ornare aenean euismod elementum nisi quis. Viverra orci sagittis eu volutpat odio facilisis mauris. Lacus luctus accumsan tortor posuere. Diam volutpat commodo sed egestas. Libero enim sed faucibus turpis in eu mi. Amet massa vitae tortor condimentum lacinia quis vel eros donec. Mi in nulla posuere sollicitudin aliquam ultrices sagittis orci. Nibh cras pulvinar mattis nunc sed. Morbi tristique senectus et netus et malesuada fames ac. Ut sem nulla pharetra diam sit amet nisl suscipit. Nunc scelerisque viverra mauris in aliquam sem fringilla. Nisl purus in mollis nunc sed. Id eu nisl nunc mi ipsum faucibus. Quam id leo in vitae turpis massa sed. Semper quis lectus nulla at volutpat. Fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec. Elementum tempus egestas sed sed risus pretium. Feugiat nisl pretium fusce id velit ut.

::image-figure{src="https://dummy.kohei.dev/yet-another.gif" caption="Hac habitasse platea dictumst quisque sagittis purus sit amet volutpat consequat mauris" width="16" height="16"}

### Blandit volutpat maecenas

Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget. Velit scelerisque in dictum non consectetur a erat. Odio morbi quis commodo odio aenean sed adipiscing diam. Quisque egestas diam in arcu cursus euismod quis. Nullam ac tortor vitae purus faucibus ornare suspendisse. In est ante in nibh mauris cursus mattis molestie. Volutpat diam ut venenatis tellus in metus. Nisi vitae suscipit tellus mauris a diam maecenas. Tempus urna et pharetra pharetra massa massa. Porta lorem mollis aliquam ut porttitor. Egestas fringilla phasellus faucibus scelerisque. Ornare arcu odio ut sem nulla. Molestie ac feugiat sed lectus vestibulum mattis ullamcorper velit. Donec et odio pellentesque diam volutpat commodo sed egestas. Dictum sit amet justo donec enim diam vulputate ut. Pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat. Fermentum posuere urna nec tincidunt praesent semper feugiat. Neque viverra justo nec ultrices dui. Neque gravida in fermentum et. Fames ac turpis egestas integer eget aliquet.

## Volutpat blandit aliquam etiam erat

Id venenatis a condimentum vitae sapien pellentesque habitant morbi tristique. In hendrerit gravida rutrum quisque non. Amet consectetur adipiscing elit duis tristique sollicitudin. Faucibus ornare suspendisse sed nisi lacus sed viverra. Est placerat in egestas erat imperdiet. Non enim praesent elementum facilisis leo vel. Pellentesque diam volutpat commodo sed egestas. Vitae tortor condimentum lacinia quis vel eros donec ac odio. Sit amet commodo nulla facilisi nullam vehicula. Varius duis at consectetur lorem donec massa sapien faucibus et. Accumsan lacus vel facilisis volutpat est velit egestas dui. Cursus eget nunc scelerisque viverra mauris in. Integer eget aliquet nibh praesent tristique magna sit amet purus. Consequat nisl vel pretium lectus quam id leo. Nunc eget lorem dolor sed viverra ipsum.

::webpage-embed{title="Pharetra sit amet aliquam id diam maecenas ultricies mi eget mauris pharetra" href="https://dummy.kohei.dev/path/to/page"}
`.trimStart();

const mdast = {
  children: [
    {
      attributes: {
        id: "b1f4aaa6",
      },
      children: [
        {
          position: {
            end: {
              column: 30,
              line: 1,
              offset: 29,
            },
            start: {
              column: 4,
              line: 1,
              offset: 3,
            },
          },
          type: "text",
          value: "Lorem ipsum dolor sit amet",
        },
      ],
      name: "rich-heading-2",
      position: {
        end: {
          column: 30,
          line: 1,
          offset: 29,
        },
        start: {
          column: 1,
          line: 1,
          offset: 0,
        },
      },
      type: "leafDirective",
    },
    {
      children: [
        {
          position: {
            end: {
              column: 668,
              line: 3,
              offset: 698,
            },
            start: {
              column: 1,
              line: 3,
              offset: 31,
            },
          },
          type: "text",
          value:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In ornare quam viverra orci. Venenatis tellus in metus vulputate. Egestas diam in arcu cursus euismod quis viverra nibh. Nulla malesuada pellentesque elit eget gravida cum. Augue lacus viverra vitae congue eu consequat ac felis. Viverra adipiscing at in tellus integer. Blandit cursus risus at ultrices mi. Cursus mattis molestie a iaculis at. Faucibus ornare suspendisse sed nisi lacus sed viverra tellus. Semper quis lectus nulla at volutpat diam. Cursus eget nunc scelerisque viverra mauris in. Nibh ipsum consequat nisl vel pretium lectus.",
        },
      ],
      position: {
        end: {
          column: 668,
          line: 3,
          offset: 698,
        },
        start: {
          column: 1,
          line: 3,
          offset: 31,
        },
      },
      type: "paragraph",
    },
    {
      children: [
        {
          position: {
            end: {
              column: 889,
              line: 5,
              offset: 1588,
            },
            start: {
              column: 1,
              line: 5,
              offset: 700,
            },
          },
          type: "text",
          value:
            "Eu feugiat pretium nibh ipsum consequat nisl vel. Odio facilisis mauris sit amet massa vitae tortor condimentum. Cursus risus at ultrices mi. In vitae turpis massa sed elementum tempus egestas. Amet dictum sit amet justo donec enim diam. Eu volutpat odio facilisis mauris sit amet massa. Magna etiam tempor orci eu lobortis elementum nibh. Tortor aliquam nulla facilisi cras fermentum odio eu feugiat. Elementum tempus egestas sed sed risus pretium quam vulputate dignissim. Neque volutpat ac tincidunt vitae semper quis lectus. Eu nisl nunc mi ipsum faucibus. Duis convallis convallis tellus id interdum velit laoreet id. In eu mi bibendum neque. In pellentesque massa placerat duis. Vel fringilla est ullamcorper eget nulla facilisi. Ornare massa eget egestas purus viverra accumsan in. Nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper. Pellentesque adipiscing commodo elit at.",
        },
      ],
      position: {
        end: {
          column: 889,
          line: 5,
          offset: 1588,
        },
        start: {
          column: 1,
          line: 5,
          offset: 700,
        },
      },
      type: "paragraph",
    },
    {
      attributes: {
        variant: "warning",
      },
      children: [
        {
          children: [
            {
              position: {
                end: {
                  column: 625,
                  line: 8,
                  offset: 2244,
                },
                start: {
                  column: 1,
                  line: 8,
                  offset: 1620,
                },
              },
              type: "text",
              value:
                "A condimentum vitae sapien pellentesque habitant. In ornare quam viverra orci sagittis eu volutpat odio. Nunc sed augue lacus viverra. Vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique. Bibendum est ultricies integer quis auctor elit. Porttitor rhoncus dolor purus non enim praesent elementum. Cras pulvinar mattis nunc sed blandit libero volutpat. Vitae congue eu consequat ac felis donec et. Ipsum suspendisse ultrices gravida dictum fusce ut placerat orci. Mauris in aliquam sem fringilla. Turpis massa tincidunt dui ut. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper.",
            },
          ],
          position: {
            end: {
              column: 625,
              line: 8,
              offset: 2244,
            },
            start: {
              column: 1,
              line: 8,
              offset: 1620,
            },
          },
          type: "paragraph",
        },
        {
          children: [
            {
              position: {
                end: {
                  column: 888,
                  line: 10,
                  offset: 3133,
                },
                start: {
                  column: 1,
                  line: 10,
                  offset: 2246,
                },
              },
              type: "text",
              value:
                "Sed cras ornare arcu dui. Non diam phasellus vestibulum lorem sed risus ultricies. Est pellentesque elit ullamcorper dignissim. Massa tincidunt nunc pulvinar sapien et ligula. Tempus iaculis urna id volutpat lacus. At risus viverra adipiscing at in tellus. Mi ipsum faucibus vitae aliquet nec ullamcorper sit amet. Sapien et ligula ullamcorper malesuada proin. Lacus viverra vitae congue eu consequat ac felis donec. Tincidunt lobortis feugiat vivamus at augue. Pretium vulputate sapien nec sagittis aliquam malesuada. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Pellentesque id nibh tortor id aliquet lectus proin nibh. Sed odio morbi quis commodo. Ultrices dui sapien eget mi proin sed. Sit amet consectetur adipiscing elit pellentesque habitant morbi tristique senectus. Massa tempor nec feugiat nisl pretium fusce. Vulputate enim nulla aliquet porttitor lacus.",
            },
          ],
          position: {
            end: {
              column: 888,
              line: 10,
              offset: 3133,
            },
            start: {
              column: 1,
              line: 10,
              offset: 2246,
            },
          },
          type: "paragraph",
        },
      ],
      name: "callout",
      position: {
        end: {
          column: 4,
          line: 11,
          offset: 3137,
        },
        start: {
          column: 1,
          line: 7,
          offset: 1590,
        },
      },
      type: "containerDirective",
    },
    {
      attributes: {
        id: "499c33a8",
      },
      children: [
        {
          position: {
            end: {
              column: 70,
              line: 13,
              offset: 3208,
            },
            start: {
              column: 5,
              line: 13,
              offset: 3143,
            },
          },
          type: "text",
          value:
            "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        },
      ],
      name: "rich-heading-3",
      position: {
        end: {
          column: 70,
          line: 13,
          offset: 3208,
        },
        start: {
          column: 1,
          line: 13,
          offset: 3139,
        },
      },
      type: "leafDirective",
    },
    {
      children: [
        {
          position: {
            end: {
              column: 846,
              line: 15,
              offset: 4055,
            },
            start: {
              column: 1,
              line: 15,
              offset: 3210,
            },
          },
          type: "text",
          value:
            "Nulla pellentesque dignissim enim sit amet venenatis urna cursus. Diam phasellus vestibulum lorem sed risus. Enim sed faucibus turpis in. Donec ac odio tempor orci dapibus ultrices in iaculis. Nullam vehicula ipsum a arcu cursus vitae. In pellentesque massa placerat duis ultricies lacus sed. Malesuada fames ac turpis egestas sed. Est ultricies integer quis auctor elit. Aliquet enim tortor at auctor urna. Quisque egestas diam in arcu cursus euismod quis viverra nibh. Volutpat lacus laoreet non curabitur gravida arcu. Viverra orci sagittis eu volutpat odio facilisis. Non nisi est sit amet facilisis magna etiam tempor orci. Amet nisl suscipit adipiscing bibendum est. Ornare quam viverra orci sagittis. In arcu cursus euismod quis viverra nibh cras pulvinar mattis. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed ullamcorper.",
        },
      ],
      position: {
        end: {
          column: 846,
          line: 15,
          offset: 4055,
        },
        start: {
          column: 1,
          line: 15,
          offset: 3210,
        },
      },
      type: "paragraph",
    },
    {
      children: [
        {
          position: {
            end: {
              column: 482,
              line: 17,
              offset: 4538,
            },
            start: {
              column: 1,
              line: 17,
              offset: 4057,
            },
          },
          type: "text",
          value:
            "Purus sit amet luctus venenatis lectus magna fringilla urna. At quis risus sed vulputate odio. Sollicitudin aliquam ultrices sagittis orci a. A scelerisque purus semper eget duis at tellus. Tortor id aliquet lectus proin nibh nisl condimentum id. Auctor neque vitae tempus quam pellentesque nec nam. Nunc sed id semper risus. Volutpat diam ut venenatis tellus in metus. Ac tortor vitae purus faucibus ornare suspendisse. Mauris sit amet massa vitae. Tristique senectus et netus et.",
        },
      ],
      position: {
        end: {
          column: 482,
          line: 17,
          offset: 4538,
        },
        start: {
          column: 1,
          line: 17,
          offset: 4057,
        },
      },
      type: "paragraph",
    },
    {
      children: [
        {
          position: {
            end: {
              column: 700,
              line: 19,
              offset: 5239,
            },
            start: {
              column: 1,
              line: 19,
              offset: 4540,
            },
          },
          type: "text",
          value:
            "Egestas purus viverra accumsan in nisl. Congue quisque egestas diam in arcu cursus. Etiam sit amet nisl purus in mollis nunc sed. Urna neque viverra justo nec ultrices dui sapien eget. Faucibus a pellentesque sit amet porttitor. Fusce id velit ut tortor. Malesuada fames ac turpis egestas sed. Diam vel quam elementum pulvinar. Sed sed risus pretium quam vulputate dignissim suspendisse in. Nunc faucibus a pellentesque sit amet porttitor eget dolor. Sed turpis tincidunt id aliquet risus feugiat. Velit ut tortor pretium viverra suspendisse potenti nullam ac tortor. Eros donec ac odio tempor orci dapibus ultrices. Velit sed ullamcorper morbi tincidunt ornare. In pellentesque massa placerat duis.",
        },
      ],
      position: {
        end: {
          column: 700,
          line: 19,
          offset: 5239,
        },
        start: {
          column: 1,
          line: 19,
          offset: 4540,
        },
      },
      type: "paragraph",
    },
    {
      attributes: {
        caption:
          "Mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper",
        height: "16",
        src: "https://dummy.kohei.dev/some.png",
        width: "16",
      },
      name: "image-figure",
      type: "leafDirective",
    },
    {
      attributes: {
        id: "f8404545",
      },
      children: [
        {
          position: {
            end: {
              column: 27,
              line: 23,
              offset: 5394,
            },
            start: {
              column: 5,
              line: 23,
              offset: 5372,
            },
          },
          type: "text",
          value: "Consectetur adipiscing",
        },
      ],
      name: "rich-heading-3",
      position: {
        end: {
          column: 27,
          line: 23,
          offset: 5394,
        },
        start: {
          column: 1,
          line: 23,
          offset: 5368,
        },
      },
      type: "leafDirective",
    },
    {
      children: [
        {
          position: {
            end: {
              column: 660,
              line: 25,
              offset: 6055,
            },
            start: {
              column: 1,
              line: 25,
              offset: 5396,
            },
          },
          type: "text",
          value:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Metus vulputate eu scelerisque felis imperdiet proin fermentum. Cras fermentum odio eu feugiat pretium. Scelerisque eleifend donec pretium vulputate. Tellus molestie nunc non blandit massa enim nec dui. Duis ultricies lacus sed turpis tincidunt id aliquet. Et tortor consequat id porta nibh venenatis cras. Adipiscing elit duis tristique sollicitudin nibh sit. Malesuada proin libero nunc consequat interdum varius sit amet mattis. Scelerisque felis imperdiet proin fermentum leo vel. Rhoncus urna neque viverra justo nec ultrices dui.",
        },
      ],
      position: {
        end: {
          column: 660,
          line: 25,
          offset: 6055,
        },
        start: {
          column: 1,
          line: 25,
          offset: 5396,
        },
      },
      type: "paragraph",
    },
    {
      attributes: {
        id: "823e5b36",
      },
      children: [
        {
          position: {
            end: {
              column: 31,
              line: 27,
              offset: 6087,
            },
            start: {
              column: 4,
              line: 27,
              offset: 6060,
            },
          },
          type: "text",
          value: "Pellentesque habitant morbi",
        },
      ],
      name: "rich-heading-2",
      position: {
        end: {
          column: 31,
          line: 27,
          offset: 6087,
        },
        start: {
          column: 1,
          line: 27,
          offset: 6057,
        },
      },
      type: "leafDirective",
    },
    {
      attributes: {
        id: "0b3c8e90",
      },
      children: [
        {
          position: {
            end: {
              column: 29,
              line: 29,
              offset: 6117,
            },
            start: {
              column: 5,
              line: 29,
              offset: 6093,
            },
          },
          type: "text",
          value: "Aliquam vestibulum morbi",
        },
      ],
      name: "rich-heading-3",
      position: {
        end: {
          column: 29,
          line: 29,
          offset: 6117,
        },
        start: {
          column: 1,
          line: 29,
          offset: 6089,
        },
      },
      type: "leafDirective",
    },
    {
      children: [
        {
          position: {
            end: {
              column: 665,
              line: 31,
              offset: 6783,
            },
            start: {
              column: 1,
              line: 31,
              offset: 6119,
            },
          },
          type: "text",
          value:
            "Fermentum leo vel orci porta non pulvinar neque laoreet suspendisse. Sapien faucibus et molestie ac feugiat sed lectus vestibulum mattis. Pellentesque habitant morbi tristique senectus. Facilisi nullam vehicula ipsum a arcu. Ut sem nulla pharetra diam sit amet nisl suscipit adipiscing. Quam nulla porttitor massa id neque aliquam vestibulum morbi. Leo a diam sollicitudin tempor. Sit amet dictum sit amet justo donec. Urna id volutpat lacus laoreet non curabitur gravida arcu ac. Urna nunc id cursus metus aliquam eleifend mi. Condimentum id venenatis a condimentum vitae sapien pellentesque habitant morbi. Gravida rutrum quisque non tellus orci ac auctor augue.",
        },
      ],
      position: {
        end: {
          column: 665,
          line: 31,
          offset: 6783,
        },
        start: {
          column: 1,
          line: 31,
          offset: 6119,
        },
      },
      type: "paragraph",
    },
    {
      attributes: {
        description:
          "At auctor urna nunc id cursus metus aliquam eleifend. Nisi lacus sed viverra tellus in. Vel pharetra vel turpis nunc eget lorem dolor. Tempus urna et pharetra pharetra massa massa ultricies. Odio morbi quis commodo odio. Sed elementum tempus egestas sed sed risus pretium quam. Non nisi est sit amet facilisis magna etiam tempor. Leo vel orci porta non. Vehicula ipsum a arcu cursus vitae congue mauris. Amet commodo nulla facilisi nullam vehicula. In arcu cursus euismod quis viverra nibh. Mi proin sed libero enim. Diam in arcu cursus euismod. Iaculis eu non diam phasellus vestibulum lorem sed risus ultricies.",
        href: "https://dummy.kohei.dev/?hl=en-US",
        imageSrc: "https://dummy.kohei.dev/thumbnail.png",
        title:
          "Leo a diam sollicitudin tempor id. Sit amet volutpat consequat mauris nunc congue nisi vitae",
      },
      name: "webpage-embed",
      type: "leafDirective",
    },
    {
      attributes: {
        id: "5e22679a",
      },
      children: [
        {
          position: {
            end: {
              column: 52,
              line: 35,
              offset: 6942,
            },
            start: {
              column: 6,
              line: 35,
              offset: 6896,
            },
          },
          type: "text",
          value: "Nisi lacus sed viverra tellus in hac habitasse",
        },
      ],
      name: "rich-heading-4",
      position: {
        end: {
          column: 52,
          line: 35,
          offset: 6942,
        },
        start: {
          column: 1,
          line: 35,
          offset: 6891,
        },
      },
      type: "leafDirective",
    },
    {
      attributes: {
        id: "c71319f8",
      },
      children: [
        {
          position: {
            end: {
              column: 27,
              line: 37,
              offset: 6970,
            },
            start: {
              column: 7,
              line: 37,
              offset: 6950,
            },
          },
          type: "text",
          value: "Blandit cursus risus",
        },
      ],
      name: "rich-heading-5",
      position: {
        end: {
          column: 27,
          line: 37,
          offset: 6970,
        },
        start: {
          column: 1,
          line: 37,
          offset: 6944,
        },
      },
      type: "leafDirective",
    },
    {
      children: [
        {
          position: {
            end: {
              column: 604,
              line: 39,
              offset: 7575,
            },
            start: {
              column: 1,
              line: 39,
              offset: 6972,
            },
          },
          type: "text",
          value:
            "Eget mauris pharetra et ultrices neque. Consequat interdum varius sit amet mattis vulputate enim nulla aliquet. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus vel. Amet est placerat in egestas erat imperdiet. Pellentesque elit ullamcorper dignissim cras tincidunt. Nunc mattis enim ut tellus elementum sagittis. Vel quam elementum pulvinar etiam non. Amet tellus cras adipiscing enim eu turpis egestas pretium. Accumsan lacus vel facilisis volutpat est velit. Vitae nunc sed velit dignissim sodales ut eu sem. Vel pretium lectus quam id leo. Platea dictumst quisque sagittis purus sit.",
        },
      ],
      position: {
        end: {
          column: 604,
          line: 39,
          offset: 7575,
        },
        start: {
          column: 1,
          line: 39,
          offset: 6972,
        },
      },
      type: "paragraph",
    },
    {
      attributes: {
        caption:
          "Viverra maecenas accumsan lacus vel. Duis ut diam quam nulla porttitor massa id neque aliquam. Sagittis eu volutpat odio facilisis.",
        height: "16",
        src: "https://dummy.kohei.dev/another.jpg",
        width: "16",
      },
      children: [],
      name: "image-figure",
      position: {
        end: {
          column: 200,
          line: 41,
          offset: 7776,
        },
        start: {
          column: 1,
          line: 41,
          offset: 7577,
        },
      },
      type: "leafDirective",
    },
    {
      children: [
        {
          position: {
            end: {
              column: 869,
              line: 43,
              offset: 8646,
            },
            start: {
              column: 1,
              line: 43,
              offset: 7778,
            },
          },
          type: "text",
          value:
            "At varius vel pharetra vel turpis nunc eget lorem. Quam pellentesque nec nam aliquam sem et. Sit amet justo donec enim diam vulputate. Habitant morbi tristique senectus et netus et malesuada fames ac. Sodales ut eu sem integer. Urna id volutpat lacus laoreet non curabitur gravida arcu ac. Nibh tellus molestie nunc non. A lacus vestibulum sed arcu non odio euismod lacinia. Magna sit amet purus gravida quis. Nulla aliquet porttitor lacus luctus accumsan tortor posuere. Amet massa vitae tortor condimentum lacinia quis vel eros donec. Elementum curabitur vitae nunc sed velit dignissim. Urna porttitor rhoncus dolor purus non enim praesent. Id faucibus nisl tincidunt eget nullam non. Dui faucibus in ornare quam viverra orci sagittis eu volutpat. Faucibus vitae aliquet nec ullamcorper. Ac felis donec et odio pellentesque diam. Velit euismod in pellentesque massa.",
        },
      ],
      position: {
        end: {
          column: 869,
          line: 43,
          offset: 8646,
        },
        start: {
          column: 1,
          line: 43,
          offset: 7778,
        },
      },
      type: "paragraph",
    },
    {
      children: [
        {
          position: {
            end: {
              column: 882,
              line: 45,
              offset: 9529,
            },
            start: {
              column: 1,
              line: 45,
              offset: 8648,
            },
          },
          type: "text",
          value:
            "Et ultrices neque ornare aenean euismod elementum nisi quis. Viverra orci sagittis eu volutpat odio facilisis mauris. Lacus luctus accumsan tortor posuere. Diam volutpat commodo sed egestas. Libero enim sed faucibus turpis in eu mi. Amet massa vitae tortor condimentum lacinia quis vel eros donec. Mi in nulla posuere sollicitudin aliquam ultrices sagittis orci. Nibh cras pulvinar mattis nunc sed. Morbi tristique senectus et netus et malesuada fames ac. Ut sem nulla pharetra diam sit amet nisl suscipit. Nunc scelerisque viverra mauris in aliquam sem fringilla. Nisl purus in mollis nunc sed. Id eu nisl nunc mi ipsum faucibus. Quam id leo in vitae turpis massa sed. Semper quis lectus nulla at volutpat. Fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec. Elementum tempus egestas sed sed risus pretium. Feugiat nisl pretium fusce id velit ut.",
        },
      ],
      position: {
        end: {
          column: 882,
          line: 45,
          offset: 9529,
        },
        start: {
          column: 1,
          line: 45,
          offset: 8648,
        },
      },
      type: "paragraph",
    },
    {
      attributes: {
        caption:
          "Hac habitasse platea dictumst quisque sagittis purus sit amet volutpat consequat mauris",
        height: "16",
        src: "https://dummy.kohei.dev/yet-another.gif",
        width: "16",
      },
      children: [],
      name: "image-figure",
      position: {
        end: {
          column: 183,
          line: 47,
          offset: 9713,
        },
        start: {
          column: 1,
          line: 47,
          offset: 9531,
        },
      },
      type: "leafDirective",
    },
    {
      attributes: {
        id: "67942ed6",
      },
      children: [
        {
          position: {
            end: {
              column: 30,
              line: 49,
              offset: 9744,
            },
            start: {
              column: 5,
              line: 49,
              offset: 9719,
            },
          },
          type: "text",
          value: "Blandit volutpat maecenas",
        },
      ],
      name: "rich-heading-3",
      position: {
        end: {
          column: 30,
          line: 49,
          offset: 9744,
        },
        start: {
          column: 1,
          line: 49,
          offset: 9715,
        },
      },
      type: "leafDirective",
    },
    {
      children: [
        {
          position: {
            end: {
              column: 1039,
              line: 51,
              offset: 10784,
            },
            start: {
              column: 1,
              line: 51,
              offset: 9746,
            },
          },
          type: "text",
          value:
            "Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget. Velit scelerisque in dictum non consectetur a erat. Odio morbi quis commodo odio aenean sed adipiscing diam. Quisque egestas diam in arcu cursus euismod quis. Nullam ac tortor vitae purus faucibus ornare suspendisse. In est ante in nibh mauris cursus mattis molestie. Volutpat diam ut venenatis tellus in metus. Nisi vitae suscipit tellus mauris a diam maecenas. Tempus urna et pharetra pharetra massa massa. Porta lorem mollis aliquam ut porttitor. Egestas fringilla phasellus faucibus scelerisque. Ornare arcu odio ut sem nulla. Molestie ac feugiat sed lectus vestibulum mattis ullamcorper velit. Donec et odio pellentesque diam volutpat commodo sed egestas. Dictum sit amet justo donec enim diam vulputate ut. Pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat. Fermentum posuere urna nec tincidunt praesent semper feugiat. Neque viverra justo nec ultrices dui. Neque gravida in fermentum et. Fames ac turpis egestas integer eget aliquet.",
        },
      ],
      position: {
        end: {
          column: 1039,
          line: 51,
          offset: 10784,
        },
        start: {
          column: 1,
          line: 51,
          offset: 9746,
        },
      },
      type: "paragraph",
    },
    {
      attributes: {
        id: "96226d72",
      },
      children: [
        {
          position: {
            end: {
              column: 39,
              line: 53,
              offset: 10824,
            },
            start: {
              column: 4,
              line: 53,
              offset: 10789,
            },
          },
          type: "text",
          value: "Volutpat blandit aliquam etiam erat",
        },
      ],
      name: "rich-heading-2",
      position: {
        end: {
          column: 39,
          line: 53,
          offset: 10824,
        },
        start: {
          column: 1,
          line: 53,
          offset: 10786,
        },
      },
      type: "leafDirective",
    },
    {
      children: [
        {
          position: {
            end: {
              column: 813,
              line: 55,
              offset: 11638,
            },
            start: {
              column: 1,
              line: 55,
              offset: 10826,
            },
          },
          type: "text",
          value:
            "Id venenatis a condimentum vitae sapien pellentesque habitant morbi tristique. In hendrerit gravida rutrum quisque non. Amet consectetur adipiscing elit duis tristique sollicitudin. Faucibus ornare suspendisse sed nisi lacus sed viverra. Est placerat in egestas erat imperdiet. Non enim praesent elementum facilisis leo vel. Pellentesque diam volutpat commodo sed egestas. Vitae tortor condimentum lacinia quis vel eros donec ac odio. Sit amet commodo nulla facilisi nullam vehicula. Varius duis at consectetur lorem donec massa sapien faucibus et. Accumsan lacus vel facilisis volutpat est velit egestas dui. Cursus eget nunc scelerisque viverra mauris in. Integer eget aliquet nibh praesent tristique magna sit amet purus. Consequat nisl vel pretium lectus quam id leo. Nunc eget lorem dolor sed viverra ipsum.",
        },
      ],
      position: {
        end: {
          column: 813,
          line: 55,
          offset: 11638,
        },
        start: {
          column: 1,
          line: 55,
          offset: 10826,
        },
      },
      type: "paragraph",
    },
    {
      attributes: {
        description:
          "Euismod elementum nisi quis eleifend quam adipiscing vitae",
        href: "https://dummy.kohei.dev/path/to/page?hl=en-US",
        imageSrc: "https://dummy.kohei.dev/thumbnail.png",
        title: "Id semper risus in hendrerit gravida rutrum quisque",
      },
      children: [],
      name: "webpage-embed",
      position: {
        end: {
          column: 146,
          line: 57,
          offset: 11785,
        },
        start: {
          column: 1,
          line: 57,
          offset: 11640,
        },
      },
      type: "leafDirective",
    },
  ],
  position: {
    end: {
      column: 1,
      line: 58,
      offset: 11786,
    },
    start: {
      column: 1,
      line: 1,
      offset: 0,
    },
  },
  type: "root",
};

describe("parseMarkdown()", () => {
  const server = setupServer();

  beforeAll(() => {
    server.use(
      rest.get("https://dummy.kohei.dev/", (_, res, ctx) =>
        res(
          ctx.set("content-type", "text/html"),
          ctx.text(`
            <!DOCTYPE html>
            <html lang="en-US">
            <head>
              <meta charSet="utf-8"/>
              <meta property="og:url" content="https://dummy.kohei.dev/?hl=en-US"/>
              <meta property="og:title" content="Leo a diam sollicitudin tempor id. Sit amet volutpat consequat mauris nunc congue nisi vitae"/>
              <meta property="og:description" content="At auctor urna nunc id cursus metus aliquam eleifend. Nisi lacus sed viverra tellus in. Vel pharetra vel turpis nunc eget lorem dolor. Tempus urna et pharetra pharetra massa massa ultricies. Odio morbi quis commodo odio. Sed elementum tempus egestas sed sed risus pretium quam. Non nisi est sit amet facilisis magna etiam tempor. Leo vel orci porta non. Vehicula ipsum a arcu cursus vitae congue mauris. Amet commodo nulla facilisi nullam vehicula. In arcu cursus euismod quis viverra nibh. Mi proin sed libero enim. Diam in arcu cursus euismod. Iaculis eu non diam phasellus vestibulum lorem sed risus ultricies."/>
              <meta property="og:image" content="https://dummy.kohei.dev/thumbnail.png"/>
            </head>
            <body>
              <p>Hello!</p>
            </body>
            </html>
          `)
        )
      ),
      rest.get("https://dummy.kohei.dev/path/to/page", (_, res, ctx) =>
        res(
          ctx.set("content-type", "text/html"),
          ctx.text(`
            <!DOCTYPE html>
            <html lang="en-US">
            <head>
              <meta charSet="utf-8"/>
              <meta property="og:url" content="https://dummy.kohei.dev/path/to/page?hl=en-US"/>
              <meta property="og:title" content="Id semper risus in hendrerit gravida rutrum quisque"/>
              <meta property="og:description" content="Euismod elementum nisi quis eleifend quam adipiscing vitae"/>
              <meta property="og:image" content="https://dummy.kohei.dev/thumbnail.png"/>
            </head>
            <body>
              <p>Hello!</p>
            </body>
            </html>
          `)
        )
      ),
      rest.get("https://dummy.kohei.dev/some.png", (_, res, ctx) =>
        res(
          ctx.set("content-type", "image/png"),
          ctx.body(
            Buffer.from(
              "89504E470D0A1A0A0000000D49484452000000100000001008060000001FF3FF610000024E494441547801A59303AC25591884FBD9B66DDBB66DDBB66D056BC41BAD6D7B776C3FDBF6AB39DD191B7FF2DDDBAAAAA39FF22AF67F299EF892141BC184904A6827F412F2080A4F342065CEC3CEFE6EB8AEDEC2AB7E01F8332D13414A2AD88F4CC0799F20146A68EFB25254F54306A464C439B83E68D6373E8AD2D4063A7A809E01866FE29350A0A903442702891978C7C206E4FBF07BC56E01D272F3EBE1B1CC07E7BD0310A7A9853A0747CC56543326E3A5158857D70012D281F834C870737F765B1C9A6064BC9BA3A377448BEF85368C5355C3B5C212DA84994E8FA109F623E221C2CEF91E2D36CA3435DF46773F08473FF9071F223AE9105109778DE25210A0A68E0A7B47243BBBC0C1D8045101016063E318A0F8D9D9BF19F2F2B93357DA68BEA2FA284A4B07C3FE21CC705F37B342465A3AAE5CBD8EE1D171CCCE2F626D630BBEBEBE8B5492B2EACE90B139FA3DBC305C547AD7A8B513C16A1AA8D033C41B6FBD4D0B18CE9EBF80B18929E6DACBDB6781729292BA4CA75CF4094417995BB98D2DD0D6C518F8E8E9E1E34F3E633EFEFEC79FB0B8BC7AC7E8EB6FBE03997E1D81AAFADCC1E5CE7C7F75F144A1950D826D6CF0F73FFFDD118C4F4E63757D9331F9EE871FA1ABAB7F8168F90894A3315914B20B2826FB1C43E69E939B8789A919FCFEC75FB83E3C7AC7E4BBEF7FA453BF271411046FED20C56E60607071648C591C3AE58E80A4DDB9FFFFF849E8E8E89CA1531FEA0552CA1212121F7B7BFBCCF4F6F5E3CCB90B4CF2A79F7F89ACEC9C2337378F490E0E8E21F29DF0539B899433A199D0434821883FBD1B5F829B5C59DB2631C7C8760000000049454E44AE426082",
              "hex"
            )
          )
        )
      ),
      rest.get("https://dummy.kohei.dev/another.jpg", (_, res, ctx) =>
        res(
          ctx.set("content-type", "image/jpeg"),
          ctx.body(
            Buffer.from(
              "FFD8FFE000104A46494600010100000100010000FFDB008400060606060706070808070A0B0A0B0A0F0E0C0C0E0F1610111011101622151915151915221E241E1C1E241E362A26262A363E3432343E4C44444C5F5A5F7C7CA701060606060706070808070A0B0A0B0A0F0E0C0C0E0F1610111011101622151915151915221E241E1C1E241E362A26262A363E3432343E4C44444C5F5A5F7C7CA7FFC20011080010001003012200021101031101FFC400160001010100000000000000000000000000070506FFDA00080101000000004AC9D545FFC40014010100000000000000000000000000000003FFDA00080102100000000FFFC40014010100000000000000000000000000000005FFDA000801031000000063FFC40023100002020006020301000000000000000001020304000506111241133107153242FFDA0008010100013F00D45AFB327675C95A382B2B71175F66F31E5C488FD841D0620EF8A9AAB54C36DAF436B30B091B9F3A3A34B0A18C6ECACC1780461D8D8AE13E3DB742CCF0D96B628B7910256AFCD678BF9562AEC41DBF4780C57C96CDA84536A7F5F972A0435C8432C8BDA0E0CCA8847BECE3FFC4001811010100030000000000000000000000000102000341FFDA0008010201013F00236D52D5A1C0CFFFC4001B11010002020300000000000000000000000302040001051222FFDA0008010301013F004B5C78840C2B4527D7DA26B3FFD9",
              "hex"
            )
          )
        )
      ),
      rest.get("https://dummy.kohei.dev/yet-another.gif", (_, res, ctx) =>
        res(
          ctx.set("content-type", "image/gif"),
          ctx.body(
            Buffer.from(
              "47494638396110001000F600000000000000000303050505050904040C04041104061405071908081515153F17172929292A2A2C2D2D2D3030313D30314D181B4F1F214D2324492B2B5023255B22235F20225B26275C2425572628572729592729542A2B5D2F305039396E25286D262969292B702629752B2E6632346E373974393A753C3E7B3D3E4343454748494848494A4A4A574D4D604041656364676869696A6B802C30872E31892E318F30349733379C3539B33D418C45478F4749954B4DBE4C50B85C5FC14146D5484DD5494FD7494EDF4C51F3545AFB555CFB565DFF575DFF585EFF585FFF5B61FF5C63FF5D64FF5E65C56366DC6E71DF6F72E37275E97578EB75788A8B8C989A9BAFB0B2B1B3B5B7B8BABABBBDBABCBDBBBDBEFF8286FF8387FF8589FF888CFF898DC3C4C6C7C8CACBCDCFD2D4D6D3D5D6DADBDDDDDFE1DFE1E3E0E2E3E2E4E6E3E5E7E4E6E8E9EBEDEDEFF1F1F3F5F2F4F600000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000021F90401000000002C00000000100010000007B1800082838485868501018783041C3B4D1145401F860732195D5F5F3D20474C378410434C3F1728515F50184B4A08821D214CB24C43154E5F4D34440600245E5E3C4846B24912272E0F2D02053A9A5E521A424B362F65676C6F2C1635394F9A5B1423546F6F64696F2A0A4B4133265C5B13556F5A6DE4578238B23E251E61E46A6EDA646120C84107111B62AC0163861C1645831AA061E3865C9B8A6216184AB062CA18335660A418B04850A292280D0502003B",
              "hex"
            )
          )
        )
      )
    );

    server.listen();
  });

  afterEach(() => {
    // server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it("returns AST", async () => {
    expect(await parseMarkdown(markdown)).toMatchSnapshot();
  });
});

describe("generateMarkdown()", () => {
  it("returns a string", async () => {
    expect(generateMarkdown(mdast)).toMatchSnapshot();
  });
});

describe("generateTableOfContents()", () => {
  it("returns an array of table of contents", () => {
    expect(generateTableOfContents(mdast)).toMatchSnapshot();
  });
});
