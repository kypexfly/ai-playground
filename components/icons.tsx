import {
  Bot,
  ChevronDown,
  Github,
  Key,
  LayoutGrid,
  ListStart,
  Loader2,
  LucideProps,
  Menu,
  RefreshCcw,
  Send,
  Settings,
  StopCircle,
  Trash,
  User,
} from "lucide-react";

export const Icons = {
  stop: StopCircle,
  delete: Trash,
  reload: RefreshCcw,
  user: User,
  bot: Bot,
  send: Send,
  layout: LayoutGrid,
  menu: Menu,
  key: Key,
  start: ListStart,
  arrowDown: ChevronDown,
  loader: Loader2,
  settings: Settings,
  github: Github,
  logo: (props: LucideProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 91.6 79.3" {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeMiterlimit={10}
        strokeWidth={4}
        d="M45.8 4 67 40.7l21.2 36.7H3.5l21.2-36.7L45.8 4zM41 12.3l38.2 65.1M36.3 20.5l33.4 56.8m-9.6 0L31.5 28.8m14.3 24.3L31.5 77.3m-9.6 0L41 45M12.5 77.3 36.3 37M41 77.3l9.6-16.2m0 16.2 4.8-8.1"
      />
    </svg>
  ),
};
