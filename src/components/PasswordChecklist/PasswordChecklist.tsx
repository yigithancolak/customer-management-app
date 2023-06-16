import { Card } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {
  List,
  ListItem,
  PassCheckContent,
  Popper
} from '../../styles/sharedStyles'

interface PasswordCheckListProps {
  anchorEl: HTMLElement | null
  password: string
}

interface ChecklistProps {
  results: ValidationResult[]
}
interface ValidationResult {
  message: ValidationMessage
  passed: boolean
}

enum ValidationPattern {
  Lowercase = '[a-z]',
  Uppercase = '[A-Z]',
  Number = '\\d',
  SpecialCharacter = '[@$!%*?&.,<>\':;|_~`=+\\-^()\\[\\]{}"\\\\/]',
  MinLength = '.{6,}'
}

enum ValidationMessage {
  Lowercase = 'Lowercase',
  Uppercase = 'Uppercase',
  Number = 'Number',
  SpecialCharacter = 'Special character',
  MinLength = 'Minimum six characters'
}

export const PasswordCheckList: React.FC<PasswordCheckListProps> = (props) => {
  const { anchorEl, password } = props
  const [passwordCheck, setPasswordCheck] = useState(false)

  const handlePasswordChange = (password: string | undefined) => {
    if (password && password.length > 3) {
      setPasswordCheck(true)
    } else {
      setPasswordCheck(false)
    }
  }

  useEffect(() => {
    handlePasswordChange(password)
  }, [password])

  const CheckList = ({ results }: ChecklistProps) => {
    if (!results) {
      return <></>
    }

    return (
      <List>
        {results.map((result, i) => (
          <ListItem key={i} isValid={result.passed}>
            {result.message}
          </ListItem>
        ))}
      </List>
    )
  }

  const validatePassword = (val: string): ValidationResult[] => {
    if (!passwordCheck) {
      return []
    }

    const resultList: ValidationResult[] = []

    for (const patternKey in ValidationPattern) {
      const patternValue =
        ValidationPattern[patternKey as keyof typeof ValidationPattern]
      const regExp = new RegExp(patternValue)
      const message =
        ValidationMessage[patternKey as keyof typeof ValidationMessage]

      const passed = regExp.test(val)

      resultList.push({ message, passed })
    }

    return resultList
  }

  return (
    <Popper open={passwordCheck && !!anchorEl} anchorEl={anchorEl}>
      <Card>
        <PassCheckContent>
          <CheckList results={validatePassword(password)} />
        </PassCheckContent>
      </Card>
    </Popper>
  )
}
