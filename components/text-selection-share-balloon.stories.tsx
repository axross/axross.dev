import { Story, Meta } from "@storybook/react";
import * as React from "react";
import {
  TextSelectionShareBalloon,
  TextSelectionShareBalloonProps,
} from "./text-selection-share-balloon";

export default {
  title: "Components/TextSelectionShareBalloon",
  component: TextSelectionShareBalloon,
  argTypes: {},
  args: {
    shareUrl:
      "https://www.kohei.dev/posts/for-engineers-who-have-overseas-ambition?hl=ja-JP",
  },
} as Meta;

export const Example: Story<TextSelectionShareBalloonProps> = (props) => (
  <>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Donec ultrices
      tincidunt arcu non sodales. Nulla facilisi nullam vehicula ipsum a arcu
      cursus. Eu mi bibendum neque egestas congue. Turpis tincidunt id aliquet
      risus feugiat in ante. Sed viverra ipsum nunc aliquet bibendum enim
      facilisis. Odio ut sem nulla pharetra diam sit amet. Odio ut sem nulla
      pharetra diam sit amet nisl. Id cursus metus aliquam eleifend mi.
      Venenatis tellus in metus vulputate eu scelerisque felis imperdiet. Etiam
      erat velit scelerisque in dictum non. Magna ac placerat vestibulum lectus
      mauris ultrices eros in. Nunc aliquet bibendum enim facilisis gravida.
      Imperdiet dui accumsan sit amet nulla facilisi morbi. Pharetra magna ac
      placerat vestibulum lectus mauris ultrices eros. Velit aliquet sagittis id
      consectetur purus ut faucibus. Nisi lacus sed viverra tellus in. Sit amet
      nisl purus in mollis nunc.
    </p>

    <p>
      Arcu non sodales neque sodales ut etiam sit amet nisl. Egestas sed tempus
      urna et pharetra pharetra massa massa ultricies. Amet facilisis magna
      etiam tempor orci eu lobortis elementum. Eros donec ac odio tempor orci
      dapibus ultrices. A diam maecenas sed enim ut sem. Aliquet bibendum enim
      facilisis gravida neque. Sed cras ornare arcu dui. Bibendum neque egestas
      congue quisque egestas diam in. Fermentum posuere urna nec tincidunt
      praesent semper. Felis bibendum ut tristique et egestas quis. In arcu
      cursus euismod quis viverra nibh cras. Fringilla urna porttitor rhoncus
      dolor purus non enim.
    </p>

    <p>
      Sit amet consectetur adipiscing elit. Consectetur purus ut faucibus
      pulvinar elementum integer. Tincidunt tortor aliquam nulla facilisi. Mi
      bibendum neque egestas congue quisque egestas. Duis at consectetur lorem
      donec massa sapien. Feugiat pretium nibh ipsum consequat nisl. Purus
      semper eget duis at tellus at urna. Volutpat maecenas volutpat blandit
      aliquam etiam erat velit scelerisque. Eget sit amet tellus cras adipiscing
      enim eu. Facilisi etiam dignissim diam quis enim lobortis scelerisque
      fermentum. Ante in nibh mauris cursus mattis molestie. Vel turpis nunc
      eget lorem dolor sed viverra. Habitant morbi tristique senectus et. Arcu
      ac tortor dignissim convallis aenean et tortor at risus. Mauris cursus
      mattis molestie a iaculis at erat. Risus at ultrices mi tempus imperdiet
      nulla malesuada. Eget duis at tellus at urna condimentum mattis
      pellentesque.
    </p>

    <p>
      Turpis in eu mi bibendum neque. Sed tempus urna et pharetra pharetra massa
      massa. Fames ac turpis egestas sed tempus urna et. Risus pretium quam
      vulputate dignissim suspendisse in est. Leo urna molestie at elementum eu.
      Pellentesque sit amet porttitor eget dolor. Odio eu feugiat pretium nibh
      ipsum consequat nisl vel pretium. Porttitor eget dolor morbi non arcu.
      Donec et odio pellentesque diam volutpat commodo sed egestas. Adipiscing
      elit pellentesque habitant morbi tristique senectus. Elementum nisi quis
      eleifend quam adipiscing. Amet mauris commodo quis imperdiet. Condimentum
      id venenatis a condimentum vitae. Malesuada bibendum arcu vitae elementum
      curabitur vitae nunc sed. Vitae et leo duis ut diam quam nulla porttitor.
      Et malesuada fames ac turpis egestas integer eget. Amet nulla facilisi
      morbi tempus iaculis urna id volutpat.
    </p>

    <p>
      Ultrices sagittis orci a scelerisque purus semper eget duis at. Ut sem
      nulla pharetra diam sit amet nisl suscipit. Vitae nunc sed velit dignissim
      sodales ut. Eget duis at tellus at urna. Massa ultricies mi quis hendrerit
      dolor magna eget est. Eros donec ac odio tempor orci. Massa tincidunt nunc
      pulvinar sapien et ligula ullamcorper malesuada. Ullamcorper morbi
      tincidunt ornare massa. Tortor dignissim convallis aenean et tortor at.
      Suspendisse in est ante in nibh mauris cursus mattis molestie. Ut
      tristique et egestas quis ipsum suspendisse ultrices. Venenatis tellus in
      metus vulputate eu. Vitae purus faucibus ornare suspendisse sed nisi.
      Lectus quam id leo in vitae turpis massa. Pellentesque habitant morbi
      tristique senectus et netus et malesuada. Commodo quis imperdiet massa
      tincidunt.
    </p>

    <TextSelectionShareBalloon {...props} />
  </>
);
