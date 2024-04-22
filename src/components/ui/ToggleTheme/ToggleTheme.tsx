import { Button, Popover, PopoverContent, PopoverTrigger } from '@/components/ui'
import { THEMES } from '@/config/define'
import { useTheme } from '@/contexts/Theme'
import { cn } from '@/lib/utils'
import { Theme } from '@/types'

function ToggleTheme() {
  const { theme, setTheme } = useTheme()
  const themesArray = Object.entries(THEMES)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <div className="flex justify-center items-center w-6">
            <i className={THEMES[theme].iconClassName}></i>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-0">
        <ul className="py-2">
          {themesArray.map(([themeKey, themeObj]) => (
            <li key={themeKey}>
              <button
                className={cn(
                  'w-full flex items-center gap-2 px-4 py-1 hover:bg-accent',
                  theme === themeKey ? 'bg-accent' : '',
                )}
                onClick={() => setTheme(themeKey as Theme)}
              >
                <div className="flex justify-center items-center w-6">
                  <i className={themeObj.iconClassName}></i>
                </div>
                <span>{themeObj.text}</span>
              </button>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  )
}

export default ToggleTheme
