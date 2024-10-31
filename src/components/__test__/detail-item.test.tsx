import React from 'react'
import { render } from "@testing-library/react-native"
import { DetailItem, ListItem } from '../index'
import theme from 'src/theme'
import { ThemeProvider } from '@shopify/restyle'


it('shows currency symbol if value is a number', () => {
    const detailItem = render(
        <ThemeProvider theme={theme}>
            <DetailItem value={20} />
        </ThemeProvider>)

    const symbol = detailItem.getByTestId("symbol")

    expect(symbol).toBeTruthy()
})

it('does not show currency symbol if value is a string', async () => {
    const detailItem = render(
        <ThemeProvider theme={theme}>
            <DetailItem value={'test value'} />
        </ThemeProvider>)

    expect(detailItem.queryByTestId('symbol')).toBeNull()
})