package websocket_service

import (
	"errors"

	"github.com/gorilla/websocket"
)

type Client struct {
	conn   *websocket.Conn
	closed bool
}

func NewClient(conn *websocket.Conn) *Client {
	return &Client{
		conn:   conn,
		closed: false,
	}
}

func (c *Client) ReadMessage() ([]byte, error) {
	_, message, err := c.conn.ReadMessage()
	if err != nil {
		return nil, err
	}
	return message, nil
}

func (c *Client) SendMessage(message []byte) error {
	if c.closed {
		return errors.New("connection closed")
	}
	return c.conn.WriteMessage(websocket.BinaryMessage, message)
}

func (c *Client) Close() error {
	if c.closed {
		return errors.New("connection closed")
	}
	err := c.conn.Close()
	c.closed = true
	return err
}
