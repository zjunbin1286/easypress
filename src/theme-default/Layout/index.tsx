import { Content } from '@runtime';
import 'uno.css';

export function Layout() {
  return (
    <div>
      <h1 p="2" m="4" className="fill-sky-300">
        Common Content
      </h1>
      <button
        p="y-2 x-4"
        font="semibold"
        shadow="lg"
        text="white"
        bg="sky-500 hover:sky-600"
        border="rounded-lg none"
        cursor="pointer"
        transition="all"
      >
        Unocss
      </button>
      <h1>Doc Content</h1>
      <Content />
    </div>
  );
}
