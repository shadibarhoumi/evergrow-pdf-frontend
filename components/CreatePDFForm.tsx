import styled from 'styled-components'
import { useState } from 'react'
import {Button, Input, Text, Heading } from '@chakra-ui/react'

const isValidNumber = (input: string) => input && input.length > 0 && !isNaN(parseFloat(input))

export const CreatePDFForm = () => {
  const [numbers, setNumbers] = useState<number[]>([])
  const [number, setNumber] = useState<string>()
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!isValidNumber(number)) return
    const parsedNumber = parseInt(number)
    setNumbers([...numbers, parsedNumber])
    setNumber('')
  }

  const handleGeneratePdf = async () => {
    setLoading(true)
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/generate`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ numbers }),
    })
    const pdfBlob = await response.blob()
    const pdfUrl = URL.createObjectURL(pdfBlob)
    window.open(pdfUrl)
    setLoading(false)
  }

  return (
    <Content spacing={6}>
      <Heading marginBottom={4} size='md'>PDF Creator</Heading>
      <Text color='gray'>Enter a number and click &quot;Add&quot; to add it to the list. Click &quot;Create PDF&quot; to turn the list into a PDF.</Text>
      <NumberList>
        {numbers.map((number, i) => (
          <li key={i}>
            <Text>{number}</Text>
          </li>
        ))}
      </NumberList>
      <NumberForm onSubmit={handleSubmit}>
        <Input value={number} placeholder="Enter a number" borderTopRightRadius={0} borderBottomRightRadius={0} onChange={(e) => setNumber(e.target.value)} id="number" type="text" />
        <Button borderTopLeftRadius={0} borderBottomLeftRadius={0} onClick={handleSubmit} width={24} colorScheme='teal' disabled={!isValidNumber(number)}>Add ↩</Button>
      </NumberForm>

      <Button marginTop={8} disabled={numbers.length === 0 || loading} width='100%' colorScheme='teal' onClick={handleGeneratePdf}>{ loading ? 'Creating...' : 'Create PDF' }</Button>
      <Button marginTop={4}  disabled={numbers.length === 0 || loading} width='100%' variant='link' colorScheme='teal' onClick={() => setNumbers([])}>Clear</Button>
    </Content>
  )
}

const NumberList = styled.ul`
  margin: 24px;
`

const Content = styled.div`
  margin: 24px;
  max-width: 400px;
`

const NumberForm = styled.form`
  width: 100%;
  display: flex;
`
