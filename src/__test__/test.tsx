import { render, screen } from '@testing-library/react'

import App from '../components/App'

describe('<App />', () => {
  it('should render the App', () => {
    const { container } = render(<App />)

    expect(
      screen.getByRole('heading', {
        name: /Pokemon/i,
        level: 2
      })
    ).toBeInTheDocument()

    expect(
      screen.getByText(/This is a App about Pokemon Stats/i)
    ).toBeInTheDocument()

    expect(screen.getByText(/Let's Start building./i)).toBeInTheDocument()

    expect(container.firstChild).toBeInTheDocument()
  })
})
