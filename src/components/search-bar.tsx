import { palette } from 'src/theme'
import { Text, Box, TextInput, Button } from './index'
import { AutoCapitalize } from './text-input'

interface SearchBarProps {
    query: string;
    onChangeText: (val: string) => void;
    placeholder: string;
    onSearch: () => void;
    error?: boolean;
    disabled?: boolean;
    autoCapitalize?: AutoCapitalize;
}

export default function ({ query, onChangeText, placeholder, onSearch, error, disabled, autoCapitalize = AutoCapitalize.NONE }: SearchBarProps) {
    return <Box flex={1} paddingRight='xs' alignItems='center' flexDirection='row' width="100%" backgroundColor='primary' justifyContent='space-between'>
        <Box flex={0.8} paddingRight='xs'>
            <TextInput value={query}
                onChangeText={onChangeText}
                style={{ marginTop: 8, marginBottom: 8 }}
                placeholder={placeholder}
                maxLength={38}
                //@ts-ignore
                autoCapitalize={autoCapitalize}
                autoFocus
                returnKeyType="search"
                backgroundColor={error ? palette.error : palette.primary}
                onSubmitEditing={onSearch} />
        </Box>
        <Box flex={0.2}>
            <Button variant="primary" onPress={onSearch} disabled={disabled} >
                <Text variant='subtitle' color='black'>Search</Text>
            </Button>
        </Box>

    </Box>
}