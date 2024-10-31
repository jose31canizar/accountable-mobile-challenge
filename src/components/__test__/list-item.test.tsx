import React from 'react'
import { render } from "@testing-library/react-native"
import { ListItem } from '../index'
import theme from 'src/theme'
import { ThemeProvider } from '@shopify/restyle'


it('shows a filled star if list item is saved', () => {
    const listItem = render(
        <ThemeProvider theme={theme}>
            <ListItem isSaved={true} onPress={function (): void {
            }} onFavoritePress={function (): void {
            }} id={''} name={''} symbol={''} displaySymbol={''} currentUSDPrice={0} marketCap={0} hourlyPriceChangePercentage={0} totalDailyVolume={0} highDay={0} lowDay={0} />
        </ThemeProvider>)

    const starIcon = listItem.getByLabelText("starIcon")

    expect(starIcon.props.fill).toBe("#EB9999")
})